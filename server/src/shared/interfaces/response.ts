export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    timestamp: string;
    data?: T;
    error?: {
        statusCode: number;
        details?: any;
    };
}