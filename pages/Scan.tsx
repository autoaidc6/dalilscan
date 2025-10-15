import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
// Fix: Import GoogleGenAI and Type from @google/genai according to guidelines.
import { GoogleGenAI, Type } from "@google/genai";
import { useLog } from '../context/LogContext';
import { Meal } from '../types';

const Scan = () => {
    const { t } = useTranslation();
    const { addMeal } = useLog();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<Meal | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const fileToGenerativePart = async (file: File) => {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
            reader.readAsDataURL(file);
        });
        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target?.result as string);
                setAnalysisResult(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async () => {
        if (!fileInputRef.current?.files?.length) {
            setError(t('errorNoImage'));
            return;
        }

        const file = fileInputRef.current.files[0];
        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            // Fix: Initialize GoogleGenAI with apiKey from environment variables.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const imagePart = await fileToGenerativePart(file);

            // Fix: Use ai.models.generateContent with the correct model and parameters.
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: {
                    parts: [
                        { text: "Analyze the food item in this image. Provide its name, and estimated nutritional information (calories, protein, carbs, fat) in grams. Your response MUST be in JSON." },
                        imagePart
                    ]
                },
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            calories: { type: Type.NUMBER },
                            protein: { type: Type.NUMBER },
                            carbs: { type: Type.NUMBER },
                            fat: { type: Type.NUMBER },
                        },
                        required: ["name", "calories", "protein", "carbs", "fat"],
                    },
                }
            });
            
            // Fix: Access the response text directly from the response object.
            const resultText = response.text;
            const parsedResult = JSON.parse(resultText);

            const mealData: Meal = {
                id: new Date().toISOString(),
                name: parsedResult.name,
                calories: parsedResult.calories,
                protein: parsedResult.protein,
                carbs: parsedResult.carbs,
                fat: parsedResult.fat,
                timestamp: new Date(),
                image: imageSrc!,
            };

            setAnalysisResult(mealData);

        } catch (e) {
            console.error(e);
            setError(t('errorAnalysis'));
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleLogMeal = () => {
        if (analysisResult) {
            addMeal(analysisResult);
            setAnalysisResult(null);
            setImageSrc(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{t('scanTitle')}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{t('scanSubtitle')}</p>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
                <div className="w-full max-w-md h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center mb-4 bg-gray-50 dark:bg-gray-700 overflow-hidden">
                    {imageSrc ? (
                        <img src={imageSrc} alt="Selected meal" className="h-full w-full object-cover" />
                    ) : (
                        <p className="text-gray-400">{t('selectImagePrompt')}</p>
                    )}
                </div>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors mb-4">
                    {imageSrc ? t('changeImage') : t('selectImage')}
                </label>

                {imageSrc && !analysisResult && (
                    <button
                        onClick={analyzeImage}
                        disabled={isLoading}
                        className="w-full max-w-md bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:bg-emerald-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? t('analyzing') : t('analyzeMeal')}
                    </button>
                )}

                {error && <p className="text-red-500 mt-4">{error}</p>}

                {analysisResult && (
                    <div className="w-full max-w-md mt-6 text-left">
                        <h3 className="text-xl font-bold mb-2">{analysisResult.name}</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700 dark:text-gray-300">
                            <p><strong>{t('calories')}:</strong> {analysisResult.calories.toFixed(0)}</p>
                            <p><strong>{t('protein')}:</strong> {analysisResult.protein.toFixed(1)}g</p>
                            <p><strong>{t('carbs')}:</strong> {analysisResult.carbs.toFixed(1)}g</p>
                            <p><strong>{t('fat')}:</strong> {analysisResult.fat.toFixed(1)}g</p>
                        </div>
                        <button
                            onClick={handleLogMeal}
                            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all"
                        >
                            {t('logMeal')}
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Scan;
