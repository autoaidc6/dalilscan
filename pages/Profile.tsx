import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Profile = () => {
    const { t } = useTranslation();
    const { user, updateUser } = useUser();
    const [name, setName] = useState(user.name);
    const [goal, setGoal] = useState(user.calorieGoal);
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        updateUser({ name, calorieGoal: goal });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000); // Hide message after 2 seconds
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{t('profileTitle')}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{t('profileSubtitle')}</p>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('name')}</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 dark:text-gray-200"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="goal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('calorieGoal')}</label>
                    <input
                        type="number"
                        id="goal"
                        value={goal}
                        onChange={(e) => setGoal(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 dark:text-gray-200"
                    />
                </div>
                <button
                    onClick={handleSave}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                    {t('saveChanges')}
                </button>
                {isSaved && <p className="text-green-500 text-center mt-4">{t('profileSaved')}</p>}
            </div>
        </motion.div>
    );
};

export default Profile;
