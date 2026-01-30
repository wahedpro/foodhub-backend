import { Request, Response } from "express";
import * as ProviderPublicService from "./providerPublic.service";

// get all the provider
export const getAllProviders = async (req: Request, res: Response) => {
    const providers = await ProviderPublicService.getAllProviders();
    res.status(200).json({
        success: true,
        data: providers,
    });
};

// get single provider by id
type IdParams = { id: string };
export const getProviderById = async (
    req: Request<IdParams>,
    res: Response
) => {
    const provider = await ProviderPublicService.getProviderById(req.params.id);
    res.status(200).json({
        success: true,
        data: provider,
    });
};