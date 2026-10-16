export const WORKSPACE_CHOICE_EVENT = "ledsons:kontak-choice";

export type WorkspaceKind = "solo" | "together";

export function chooseWorkspace(kind: WorkspaceKind): void {
  window.dispatchEvent(
    new CustomEvent(WORKSPACE_CHOICE_EVENT, { detail: kind })
  );
}
