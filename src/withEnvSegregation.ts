import { FC } from "react";

type NODE_ENV = "production" | "development" | "test"

export function withEnvSegregation<Props,
  CurriedFields extends keyof Props = keyof Props>(
  Component: FC<Props>,
  curriedProps: Record<NODE_ENV,
    Pick<Props, CurriedFields>>,
  env: undefined | NODE_ENV = process.env.NODE_ENV as NODE_ENV
): FC<Omit<Props, CurriedFields>> {
  return (p: Omit<Props, CurriedFields>) =>
    Component({
      ...curriedProps[env as NODE_ENV] || curriedProps["development"],
      ...p
    } as Props);
}
