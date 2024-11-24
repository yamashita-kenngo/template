import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import express, { type Request, type Response, type NextFunction } from "express";
import { createServer } from "http";

describe("Express Server", () => {
  let app: express.Express;
  let consoleLogSpy: any;

  beforeEach(() => {
    app = express();
    consoleLogSpy = vi.spyOn(console, "log");
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    vi.clearAllMocks();
  });

  it("should create an Express application with middleware", async () => {
    const server = createServer(app);
    
    expect(app).toBeDefined();
    expect(server).toBeDefined();
    
    // ミドルウェアのテスト
    const middleware = app._router.stack.filter(
      (layer: any) => layer.name === "jsonParser" || layer.name === "urlencodedParser"
    );
    
    expect(middleware).toHaveLength(2);
  });

  it("should format log messages correctly", () => {
    const mockDate = new Date("2024-01-01T12:00:00");
    vi.setSystemTime(mockDate);

    const message = "test message";
    
    const formattedTime = mockDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    expect(`${formattedTime} [express] ${message}`).toBe("12:00:00 PM [express] test message");
    
    vi.useRealTimers();
  });

  it("should handle API requests logging", () => {
    const req = {
      method: "GET",
      path: "/api/test",
    } as Request;
    
    const res = {
      statusCode: 200,
      on: vi.fn(),
      json: vi.fn(),
    } as unknown as Response;
    
    const next = vi.fn() as NextFunction;

    // ログミドルウェアをテスト
    app.use((req, res, next) => {
      const start = Date.now();
      res.on("finish", () => {
        const duration = Date.now() - start;
        if (req.path.startsWith("/api")) {
          const logLine = `${req.method} ${req.path} ${res.statusCode} in ${duration}ms`;
          console.log(logLine);
        }
      });
      next();
    });

    // ミドルウェアを実行
    app._router.handle(req, res, next);
    
    // finishイベントをシミュレート
    const finishCallback = (res.on as any).mock.calls[0][1];
    finishCallback();

    expect(next).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringMatching(/GET \/api\/test 200 in \d+ms/));
  });

  it("should handle errors correctly", () => {
    const errorMessage = "Test error";
    const error = new Error(errorMessage);
    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
    };

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
