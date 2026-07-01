import { NextResponse } from "next/server";
import { leadSearchResults, chatbotThreads, automationWorkflows } from "@/lib/module-data";

export async function GET() {
  return NextResponse.json({
    leads: leadSearchResults,
    chatbot: chatbotThreads,
    workflows: automationWorkflows,
  });
}
