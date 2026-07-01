"use client";
import { SectionCard } from "@/components/shared/SectionCard";
import { automationWorkflows } from "@/lib/module-data";

export default function WorkflowsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-slate-900">AI Automation Workflows</h2>
        <p className="mt-1 text-sm text-slate-500">Coordinate follow-ups, review requests, and nurture sequences from one workspace.</p>
      </div>

      <SectionCard title="Active workflows" description="Automation automations and task volume.">
        <div className="space-y-3">
          {automationWorkflows.map((workflow) => (
            <div key={workflow.id} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
              <div>
                <p className="font-semibold text-slate-900">{workflow.name}</p>
                <p className="text-sm text-slate-500">Trigger: {workflow.trigger}</p>
              </div>
              <div className="text-right text-sm">
                <div className="font-semibold text-slate-900">{workflow.executions} runs</div>
                <div className="text-slate-500">Status: {workflow.status}</div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
