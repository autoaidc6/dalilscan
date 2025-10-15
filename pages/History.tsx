import React from 'react';
import { useLog } from '../context/LogContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Meal } from '../types';

const MealCard = ({ meal }: { meal: Meal }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex items-center space-x-4 p-4">
            {meal.image && <img src={meal.image} alt={meal.name} className="w-20 h-20 object-cover rounded-lg" />}
            <div className="flex-grow">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{meal.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{meal.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <div className="text-xs grid grid-cols-2 gap-x-2 mt-2">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{meal.calories.toFixed(0)} {t('kcal')}</span>
                    <span className="text-blue-500">P: {meal.protein.toFixed(1)}g</span>
                    <span className="text-orange-500">C: {meal.carbs.toFixed(1)}g</span>
                    <span className="text-yellow-500">F: {meal.fat.toFixed(1)}g</span>
                </div>
            </div>
        </div>
    )
}

const History = () => {
    const { t } = useTranslation();
    const { loggedMeals } = useLog();

    const sortedMeals = [...loggedMeals].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{t('historyTitle')}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{t('historySubtitle')}</p>

            <div className="space-y-4">
                {sortedMeals.length > 0 ? (
                    sortedMeals.map(meal => <MealCard key={meal.id} meal={meal} />)
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">{t('noHistory')}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default History;
