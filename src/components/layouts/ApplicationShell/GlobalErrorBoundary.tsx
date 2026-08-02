"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { GlassCard, Button } from "@/components/ui";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught layout error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6 select-none">
          <GlassCard className="max-w-md w-full flex flex-col gap-4 text-center">
            <div className="flex justify-center text-danger">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-display font-semibold text-lg text-text-primary">System Exception Detected</h2>
              <p className="text-xs text-text-secondary leading-relaxed">
                The application encountered an unexpected runtime render failure. The WebGL context or layout node crashed.
              </p>
              {this.state.error && (
                <pre className="mt-2 p-2 rounded bg-black/40 text-[10px] text-danger font-mono text-left overflow-auto max-h-32">
                  {this.state.error.message}
                </pre>
              )}
            </div>
            <Button variant="primary" size="sm" onClick={this.handleReset} className="w-full mt-2">
              Reinitialize System
            </Button>
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}
