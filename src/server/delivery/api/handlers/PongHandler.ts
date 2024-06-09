import type { Request, Response } from "express"

export const PongHandler = (req: Request, res: Response) => {
  res.send("Pong!");
}

export default PongHandler;