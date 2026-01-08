// Cedar Policy Templates for Long Lived Transactions Viewer
// These policies use the new schema focused on Person - View - Transaction Logs
// Policy 1: Basic Application Access
// Users with HisaStaff or HelpDesk access can view the system
permit (
  principal is LongLivedTransactionsViewer::Person,
  action in [LongLivedTransactionsViewer::Action::"view"],
  resource is LongLivedTransactionsViewer::TransactionLogs
)
when
{
  context has generalAuthGroups &&
  (context.generalAuthGroups.contains("HisaStaff") ||
   context.generalAuthGroups.contains("HelpDesk"))
};
