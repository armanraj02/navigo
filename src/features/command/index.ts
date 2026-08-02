// Command palette registry and types
export interface CommandAction {
  id: string;
  name: string;
  shortcut?: string[];
  action: () => void;
}

export class CommandRegistry {
  private static commands: CommandAction[] = [];

  public static register(command: CommandAction): void {
    if (this.commands.some((c) => c.id === command.id)) return;
    this.commands.push(command);
  }

  public static getCommands(): CommandAction[] {
    return this.commands;
  }
}
