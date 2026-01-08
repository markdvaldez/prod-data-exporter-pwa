import _ from "lodash";

export type TAddDocAwsConfig = {
  AWSAccessKeyId: string;
  key: string;
  policy: string;
  signature: string;
  "x-amz-security-token": string;
};

export type TAwsPresignedPostResponse = {
  url: string;
  fields: TAddDocAwsConfig;
  additionalProperties?: Record<string, any>;
};

export type StorageAccessLevel = "public" | "protected" | "private";

export const addDocumentAwsAmplify = async ({
  file,
  config,
}: {
  file: any;
  config: TAwsPresignedPostResponse;
}): Promise<{ data?: string; error?: any }> => {
  try {
    const formData = createFormData(file, config);
    const response = await uploadFile(formData, config.url);
    const data = await handleResponse(response, file.name);
    return { data, error: undefined };
  } catch (error: any) {
    return { data: undefined, error };
  }
};

function createFormData(file: any, config: TAwsPresignedPostResponse) {
  const formData = new FormData();
  if (config?.fields) {
    _.forIn(config.fields, (value, key) => {
      formData.append(key, value);
    });
  }

  formData.append("file", file.originalFile, file.name);
  return formData;
}

async function uploadFile(formData: FormData, url: string) {
  const requestOptions = {
    method: "POST",
    body: formData,
  };
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response;
}

async function handleResponse(
  response: Response,
  fileName: string
): Promise<string> {
  const contentType = response.headers.get("content-type");
  let responseText = `File: ${fileName} successfully uploaded`;
  if (_.includes(contentType, "text/plain")) {
    const parsedText = await response.text();
    if (parsedText) {
      responseText = parsedText;
    }
  }
  return responseText;
}
