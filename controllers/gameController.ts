import { Request, Response } from "express";
import Cart from "../models/Cart";

export const postAddGame = async (req: Request, res: Response) => {
  const { gameId } = req.body;
  const { userId } = res.locals;

  try {
    await Cart.create({ gameId, userId });
    res.json({
      isFailed: false,
      errors: {},
      data: { success: true },
    });
  } catch (err) {
    res.json({
      isFailed: true,
      errors: { message: err.errors[0].message },
      data: {},
    });
  }
};

export const getGames = async (req: Request, res: Response) => {
  const { userId } = res.locals;

  try {
    const data = await Cart.findAll({
      where: { userId },
      attributes: ["gameId"],
    });
    res.json({
      isFailed: false,
      errors: {},
      data: data.map((game) => game.gameId),
    });
  } catch (err) {
    res.json({
      isFailed: true,
      data: {},
      errors: { message: err.errors[0].message },
    });
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { gameId } = req.query;

  try {
    const data = await Cart.destroy({ where: { userId, gameId } });
    if (data) {
      res.json({
        isFailed: false,
        data: { success: true },
        errors: {},
      });
    } else {
      res.json({
        isFailed: true,
        data: {},
        errors: { message: "Invalid game id" },
      });
    }
  } catch (err) {
    res.json({
      isFailed: true,
      data: {},
      errors: { message: err.errors[0].message },
    });
  }
};
