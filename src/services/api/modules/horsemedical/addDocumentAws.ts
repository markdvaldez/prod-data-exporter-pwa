export const addDocumentAws = (config: any, file: any) => {
  const formData = new FormData();
  formData.append("key", config.fields.key);
  formData.append("AWSAccessKeyId", config.fields.AWSAccessKeyId);
  formData.append(
    "x-amz-security-token",
    config.fields["x-amz-security-token"]
  );
  formData.append("policy", config.fields.policy);
  formData.append("signature", config.fields.signature);
  formData.append("file", file.originalFile, file.name);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  fetch(config.url, requestOptions)
    .then((response) => {
      console.log(response, "======>response");
      if (!response.ok) {
        console.log(response, "responseresponseresponse");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (response.headers.get("content-type")?.includes("application/json")) {
        return response.json();
      } else {
        return null;
      }
    })
    .then((data) => {
      console.log(data, "======> data");
      if (data) {
        console.log(data, "response");
        console.log(`File: ${file.name} successfully uploaded`);
      } else {
        console.warn("No valid JSON data in the response");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
