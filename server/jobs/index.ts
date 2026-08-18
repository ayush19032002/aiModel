import { googleSyncQueue, whatsappQueue, aiQueue, emailQueue, reportQueue } from './queue';

export {
  googleSyncQueue,
  whatsappQueue,
  aiQueue,
  emailQueue,
  reportQueue
};

// Helper functions to add jobs
export async function addGoogleSyncJob(jobName: string, data: any, options?: any) {
  return googleSyncQueue.add(jobName, data, options);
}

export async function addWhatsAppJob(jobName: string, data: any, options?: any) {
  return whatsappQueue.add(jobName, data, options);
}

export async function addAIJob(jobName: string, data: any, options?: any) {
  return aiQueue.add(jobName, data, options);
}

export async function addEmailJob(jobName: string, data: any, options?: any) {
  return emailQueue.add(jobName, data, options);
}

export async function addReportJob(jobName: string, data: any, options?: any) {
  return reportQueue.add(jobName, data, options);
}
