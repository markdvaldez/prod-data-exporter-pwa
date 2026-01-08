"use client";

import React, { useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { TransactionLog } from '@/Types/transaction-log.types';
import { useTransactionLogs } from '@/services/api/modules/transactionLogs';
import { ScrollArea } from '@/ui-kit/components/ScrollArea';
import { Loader } from '@/ui-kit/components/Loader';
import { NotFoundPage } from '@/ui-kit/blocks/NotFoundPage';
import { ArrowLeftIcon } from '@/ui-kit/components/Icons/ArrowLeftIcon';
import { RouteWithTransition } from '@/ui-kit/components/RouteWithTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui-kit/components/Card';
import { Button } from '@/ui-kit/components/Button';
import { Badge } from './Badge';
import routes from '@/routes';
import { Clock, User, Activity, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from '@/ui-kit/hooks/useToast';

interface DetailRowProps {
  label: string;
  value: string | React.ReactNode;
  copyable?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, copyable = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof value === 'string') {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({ title: 'Text copied to clipboard', variant: 'default' });
      } catch (err) {
        console.error('Failed to copy:', err);
        toast({ title: 'Failed to copy to clipboard', variant: 'destructive' });
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start py-4 border-b border-gray-100 last:border-b-0">
      <div className="w-full sm:w-1/3 text-sm font-medium text-gray-700 mb-1 sm:mb-0">
        {label}
      </div>
      <div className="w-full sm:w-2/3 flex items-start justify-between">
        <div className="flex-1 text-sm text-gray-900 break-all mr-2">
          {value}
        </div>
        {copyable && typeof value === 'string' && (

          <button
            type="button"
            onClick={handleCopy}
            className="text-sm px-2 py-1 rounded-md bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 inline-flex items-center"
            title="Copy message"
          >
            <FontAwesomeIcon icon={faCopy} className="h-3 w-3 mr-2" />
            Copy
          </button>
        )}
      </div>
    </div>
  );
};

// Custom hook to fetch and parse JSON from S3 file URL
function useS3JsonContent(s3Url?: string) {
  const [s3JsonContent, setS3JsonContent] = useState<any>(null);
  const [s3Loading, setS3Loading] = useState(false);
  const [s3Error, setS3Error] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchS3Json = async () => {
      if (
        s3Url &&
        /^https:\/\/.+\.amazonaws\.com\/.+/.test(s3Url)
      ) {
        setS3Loading(true);
        setS3Error(null);
        try {
          const res = await fetch(s3Url);
          if (!res.ok) throw new Error(`Failed to fetch S3 file: ${res.statusText}`);
          const json = await res.json();
          setS3JsonContent(json);
        } catch (err: any) {
          setS3Error(err.message || 'Unknown error');
          setS3JsonContent(null);
        } finally {
          setS3Loading(false);
        }
      } else {
        setS3JsonContent(null);
        setS3Error(null);
      }
    };
    fetchS3Json();
  }, [s3Url]);

  return { s3JsonContent, s3Loading, s3Error };
}

export const TransactionLogDetailContainer: React.FC = () => {
  const [useSyntaxHighlight, setUseSyntaxHighlight] = useState<boolean>(false);
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const entityId = searchParams.get('entityId');
  const timestamp = searchParams.get('timestamp');

  // Helper function to check if entity ID is a horse ID and extract the horse ID
  const getHorseIdFromEntityId = (entityId: string): string | null => {
    if (entityId.startsWith('H-') || entityId.startsWith('H')) {
      // Remove dashes to get the original horse ID (e.g., "H-000-000-087" -> "H000000087")
      return entityId.replace(/-/g, '');
    }
    return null;
  };

  const handleEntityIdClick = (entityId: string) => {
    const horseId = getHorseIdFromEntityId(entityId);
    if (horseId) {
      router.push(routes.HORSE(horseId));
    }
  };

  // Search for the specific transaction log
  const { data: logs, loading, error } = useTransactionLogs({
    page: 1,
    pageSize: 100, // Get enough records to find the specific one
    filters: {
      entityId: entityId || undefined,
    },
  });

  const transactionLog = useMemo(() => {
    if (!entityId || !timestamp || !logs.length) return null;

    return logs.find(log =>
      log.Entity_ID === entityId &&
      log.Timestamp === decodeURIComponent(timestamp)
    );
  }, [logs, entityId, timestamp]);

  // Usage in the container
  const { s3JsonContent, s3Loading, s3Error } = useS3JsonContent(
    typeof transactionLog?.MessageBody === 'string' ? transactionLog.MessageBody : undefined
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'timed out - not confirmed':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
      case 'in progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'timed out - not confirmed':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return {
        full: date.toLocaleString(),
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        iso: date.toISOString(),
      };
    } catch {
      return {
        full: timestamp,
        date: timestamp,
        time: '',
        iso: timestamp,
      };
    }
  };

  if (loading) {
    return (
      <RouteWithTransition
        id="route-TransactionLogDetailContainer"
        className="w-full h-screen overflow-hidden bg-mainBackground"
      >
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </RouteWithTransition>
    );
  }

  if (error || !entityId || !timestamp) {
    return <NotFoundPage />;
  }

  if (!transactionLog) {
    return (
      <RouteWithTransition
        id="route-TransactionLogDetailContainer"
        className="w-full h-screen overflow-hidden bg-mainBackground"
      >
        <div className="flex justify-center items-center h-full">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Transaction Log Not Found</h2>
            <p className="text-gray-600 mb-4">
              The requested transaction log could not be found.
            </p>
            <Button onClick={() => router.push(routes.TRANSACTION_LOGS)}>
              Back to Transaction Logs
            </Button>
          </div>
        </div>
      </RouteWithTransition>
    );
  }

  const formattedTimestamp = formatTimestamp(transactionLog.Timestamp);

  // Try to parse and pretty-print JSON message body if possible
  const getPrettyMessageBody = (body: unknown): { pretty: string; isJson: boolean } => {
    if (body === null || body === undefined) return { pretty: '', isJson: false };

    // If it's already an object, stringify it prettily
    if (typeof body === 'object') {
      try {
        return { pretty: JSON.stringify(body, null, 2), isJson: true };
      } catch (e) {
        return { pretty: String(body), isJson: false };
      }
    }

    // If it's a string, try to parse as JSON first
    if (typeof body === 'string') {
      const trimmed = body.trim();
      if (!trimmed) return { pretty: '', isJson: false };

      try {
        const parsed = JSON.parse(trimmed);
        return { pretty: JSON.stringify(parsed, null, 2), isJson: true };
      } catch (e) {
        // Not JSON — return original string
        return { pretty: body, isJson: false };
      }
    }

    // Fallback
    return { pretty: String(body), isJson: false };
  };

  return (
    <RouteWithTransition
      id="route-TransactionLogDetailContainer"
      className="w-full h-screen overflow-hidden bg-mainBackground"
    >
      <ScrollArea className="w-full bg-mainBackground h-full scroll-thin overflow-y-auto">
        <div className="w-full px-4 flex flex-col items-center max-w-[100vw] pb-32">
          <div className="flex w-full lg:w-2/3 xl:w-1/2 flex-col">
            {/* Back Navigation */}
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
            >
              <div className="flex flex-row items-center gap-2 pb-2 pt-2">
                <ArrowLeftIcon />
                <span className="text-sm text-gray-600">Back to Transaction Logs</span>
              </div>
            </Link>

            {/* Header */}
            <div className="flex flex-col gap-4 pb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Transaction Log Details</h1>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={`${getStatusColor(transactionLog.Status)}`}>
                  {getStatusIcon(transactionLog.Status)}
                  <span className="ml-2">{transactionLog.Status}</span>
                </Badge>
                {transactionLog.Complete ? (
                  <Badge className="bg-green-100 text-green-800 border border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Complete
                  </Badge>
                ) : (
                  <Badge className="bg-orange-100 text-orange-800 border border-orange-200">
                    <Clock className="h-3 w-3 mr-1" />
                    Incomplete
                  </Badge>
                )}
              </div>
            </div>

            {/* Main Information Card */}
            <Card className="mb-6 bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-gray-600" />
                  Transaction Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-0 px-6 pb-6">
                <DetailRow
                  label="Entity ID"
                  value={getHorseIdFromEntityId(transactionLog.Entity_ID) ? (
                    <span
                      className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
                      onClick={() => handleEntityIdClick(transactionLog.Entity_ID)}
                    >
                      {transactionLog.Entity_ID}
                    </span>
                  ) : (
                    transactionLog.Entity_ID
                  )}
                  copyable
                />
                <DetailRow
                  label="Transaction ID"
                  value={transactionLog.Transaction_ID}
                  copyable
                />
                <DetailRow
                  label="Treatment ID"
                  value={transactionLog.Hisa_Treatment_ID || 'N/A'}
                  copyable={!!transactionLog.Hisa_Treatment_ID}
                />
                <DetailRow
                  label="Action"
                  value={
                    <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                      <Activity className="h-3 w-3 mr-1" />
                      {transactionLog.Action}
                    </Badge>
                  }
                />
                <DetailRow
                  label="Status"
                  value={
                    <div className="flex items-center gap-2">
                      {getStatusIcon(transactionLog.Status)}
                      <span className="font-medium">{transactionLog.Status}</span>
                    </div>
                  }
                />
                <DetailRow
                  label="Completion Status"
                  value={
                    <div className="flex items-center gap-2">
                      {transactionLog.Complete ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-green-700 font-medium">Complete</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-red-700 font-medium">Incomplete</span>
                        </>
                      )}
                    </div>
                  }
                />
              </CardContent>
            </Card>

            {/* Timestamp Information Card */}
            <Card className="mb-6 bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-gray-600" />
                  Timestamp Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-0 px-6 pb-6">
                <DetailRow
                  label="Date"
                  value={formattedTimestamp.date}
                />
                <DetailRow
                  label="Time"
                  value={formattedTimestamp.time}
                />
                <DetailRow
                  label="Full Timestamp"
                  value={formattedTimestamp.full}
                />
                {/* <DetailRow
                  label="ISO Format"
                  value={formattedTimestamp.iso}
                  copyable
                />
                <DetailRow
                  label="Raw Timestamp"
                  value={transactionLog.Timestamp}
                  copyable
                /> */}
              </CardContent>
            </Card>

            {/* Message Body Card */}
            {s3JsonContent && s3JsonContent !== '-' && (
              <Card className="mb-6 bg-white border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between gap-2 text-lg">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-gray-600" />
                      <span>Payload</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setUseSyntaxHighlight((s) => !s)}
                        className="text-sm px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                        title={useSyntaxHighlight ? 'Turn off syntax highlighting' : 'Turn on syntax highlighting'}
                      >
                        {useSyntaxHighlight ? 'Syntax: On' : 'Syntax: Off'}
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const { pretty } = getPrettyMessageBody(s3JsonContent);
                            await navigator.clipboard.writeText(pretty);
                            setCopiedMessage(true);
                            setTimeout(() => setCopiedMessage(false), 2000);
                            toast({ title: 'Payload copied to clipboard', variant: 'default' });
                          } catch (err) {
                            console.error('Failed to copy payload:', err);
                            toast({ title: 'Failed to copy payload', variant: 'destructive' });
                          }
                        }}
                        className="text-sm px-2 py-1 rounded-md bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 inline-flex items-center"
                        title="Copy payload"
                      >
                        <FontAwesomeIcon icon={faCopy} className="h-3 w-3 mr-2" />
                        Copy
                      </button>
                      {copiedMessage && (
                        <span className="text-xs text-green-600 ml-2">Copied</span>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="relative bg-gray-50 rounded-lg p-4 border">
                    {(() => {
                      const { pretty } = getPrettyMessageBody(s3JsonContent);
                      return (
                        <div className="overflow-x-auto">
                          {useSyntaxHighlight ? (
                            <SyntaxHighlighter
                              language="json"
                              style={okaidia}
                              customStyle={{ background: 'transparent', padding: '0.5rem', margin: 0 }}
                            >
                              {pretty}
                            </SyntaxHighlighter>
                          ) : (
                            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed overflow-x-auto m-0 p-2">
                              {pretty}
                            </pre>
                          )}
                        </div>
                      );
                    })()}

                    {/* <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          try {
                            const { pretty } = getPrettyMessageBody(transactionLog.MessageBody);
                            await navigator.clipboard.writeText(pretty);
                            toast({ title: 'Payload copied to clipboard', variant: 'default' });
                          } catch (err) {
                            console.error('Failed to copy payload:', err);
                            toast({ title: 'Failed to copy payload', variant: 'destructive' });
                          }
                        }}
                        className="text-xs flex items-center"
                      >
                        <FontAwesomeIcon icon={faCopy} className="h-3 w-3 mr-1" />
                        Copy Message
                      </Button>
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200 w-full mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  onClick={() => router.push(routes.TRANSACTION_LOGS)}
                  className="flex items-center justify-center h-14 px-8 text-base font-medium flex-1 bg-white hover:bg-gray-50"
                  title="Go back to transaction logs list"
                >
                  <ArrowLeftIcon className="mr-3 h-5 w-5" />
                  Go back to transaction logs list
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      const url = `${window.location.origin}${routes.TRANSACTION_LOG_DETAIL(transactionLog.Entity_ID, transactionLog.Timestamp)}`;
                      await navigator.clipboard.writeText(url);
                      // Could add a toast notification here
                    } catch (err) {
                      console.error('Failed to copy link:', err);
                    }
                  }}
                  className="flex items-center justify-center h-14 px-8 text-base font-medium flex-1 bg-white hover:bg-gray-50"
                  title="Copy link to this transaction log"
                >
                  <FontAwesomeIcon icon={faCopy} className="h-5 w-5 mr-3" />
                  Copy link to this transaction log
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </RouteWithTransition>
  );
};