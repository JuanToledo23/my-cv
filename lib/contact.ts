export type ContactField = "name" | "email" | "topic" | "message";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; fields: ContactField[] }
  | { status: "rate-limited" }
  | { status: "error" };
