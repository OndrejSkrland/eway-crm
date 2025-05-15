import { useState, useEffect } from "react";
import connection from "./Connector";
import type { HttpMethod, IApiResult, TUnionError } from "@eway-crm/connector";

export function useCallMethod<TResponse extends IApiResult>(
  methodName: string,
  params?: object,
  httpMethod?: HttpMethod
) {
  const [data, setData] = useState<TResponse | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<TUnionError | null>(null);

  useEffect(() => {
    setLoading(true);
    connection.callMethod<TResponse>(
      methodName,
      { transmitObject: params ?? {} },
      (result) => {
        setData(result);
        setLoading(false);
      },
      undefined,
      httpMethod,
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
  }, [methodName, params, httpMethod]);
  return { data, isLoading, error };
}
