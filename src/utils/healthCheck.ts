interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  uptime: number;
  stats: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    successRate: string;
  };
  lastError: string | null;
  timestamp: string;
}

interface ServerStatus {
  openai: {
    isConfigured: boolean;
    model: string;
  };
  server: {
    version: string;
    nodeVersion: string;
    uptime: number;
  };
}

class BackendHealthCheck {
  private static instance: BackendHealthCheck;
  private isPolling: boolean = false;
  private healthCheckInterval: number = 30000; // 30 seconds
  private retryAttempts: number = 3;
  private retryDelay: number = 5000; // 5 seconds

  private constructor() {}

  static getInstance(): BackendHealthCheck {
    if (!BackendHealthCheck.instance) {
      BackendHealthCheck.instance = new BackendHealthCheck();
    }
    return BackendHealthCheck.instance;
  }

  async checkHealth(): Promise<HealthStatus> {
    try {
      const response = await fetch('/api/health');
      if (!response.ok) {
        throw new Error('Health check failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }

  async getServerStatus(): Promise<ServerStatus> {
    try {
      const response = await fetch('/api/status');
      if (!response.ok) {
        throw new Error('Status check failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Status check error:', error);
      throw error;
    }
  }

  async waitForHealthyServer(): Promise<boolean> {
    for (let i = 0; i < this.retryAttempts; i++) {
      try {
        const health = await this.checkHealth();
        if (health.status === 'healthy') {
          return true;
        }
      } catch (error) {
        console.warn(`Retry attempt ${i + 1} failed`);
      }
      await new Promise(resolve => setTimeout(resolve, this.retryDelay));
    }
    return false;
  }

  startPolling(callback: (health: HealthStatus) => void) {
    if (this.isPolling) return;
    
    this.isPolling = true;
    const poll = async () => {
      if (!this.isPolling) return;
      
      try {
        const health = await this.checkHealth();
        callback(health);
      } catch (error) {
        console.error('Health polling error:', error);
      }
      
      setTimeout(poll, this.healthCheckInterval);
    };
    
    poll();
  }

  stopPolling() {
    this.isPolling = false;
  }

  setHealthCheckInterval(interval: number) {
    this.healthCheckInterval = interval;
  }

  setRetryAttempts(attempts: number) {
    this.retryAttempts = attempts;
  }

  setRetryDelay(delay: number) {
    this.retryDelay = delay;
  }
}

export const healthCheck = BackendHealthCheck.getInstance();
