import React from 'react';
import { useUser } from '../context/UserContext';
import { useLog } from '../context/LogContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { totalCaloriesToday, totalMacrosToday } = useLog();

  const calorieProgress = user.calorieGoal > 0 ? (totalCaloriesToday / user.calorieGoal) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{t('dashboardTitle', { name: user.name })}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{t('dashboardSubtitle')}</p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-200">{t('caloriesToday')}</h2>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-300">
                {Math.round(totalCaloriesToday)} / {user.calorieGoal} kcal
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-emerald-200 dark:bg-gray-700">
            <div style={{ width: `${Math.min(calorieProgress, 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-500"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center mt-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('protein')}</p>
            <p className="text-lg font-bold text-blue-500">{Math.round(totalMacrosToday.protein)}g</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('carbs')}</p>
            <p className="text-lg font-bold text-orange-500">{Math.round(totalMacrosToday.carbs)}g</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('fat')}</p>
            <p className="text-lg font-bold text-yellow-500">{Math.round(totalMacrosToday.fat)}g</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
