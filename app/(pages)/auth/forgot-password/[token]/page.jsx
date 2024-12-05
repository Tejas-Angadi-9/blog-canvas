import React from "react";

const ValidatingToken = async ({ params }) => {
  const { token } = await params();

  return <div>Validating Token: {token}</div>;
};

export default ValidatingToken;
