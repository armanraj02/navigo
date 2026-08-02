export type AnimationTask = () => Promise<void>;

export class AnimationQueueClass {
  private static instance: AnimationQueueClass;
  private queue: AnimationTask[] = [];
  private isProcessing = false;

  private constructor() {}

  public static getInstance(): AnimationQueueClass {
    if (!AnimationQueueClass.instance) {
      AnimationQueueClass.instance = new AnimationQueueClass();
    }
    return AnimationQueueClass.instance;
  }

  public enqueue(task: AnimationTask): void {
    this.queue.push(task);
    this.processNext();
  }

  private async processNext(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;
    const task = this.queue.shift();

    if (task) {
      try {
        await task();
      } catch (error) {
        console.error("Error executing queued animation task:", error);
      }
    }

    this.isProcessing = false;
    this.processNext();
  }

  public clear(): void {
    this.queue = [];
    this.isProcessing = false;
  }

  public getQueueLength(): number {
    return this.queue.length;
  }
}

export const AnimationQueue = AnimationQueueClass.getInstance();
