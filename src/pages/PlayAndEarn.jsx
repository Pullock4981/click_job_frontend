import React from 'react';
import Layout from '../components/layout/Layout';
import { FaGamepad, FaTrophy, FaCoins, FaDice, FaQuestionCircle } from 'react-icons/fa';

const PlayAndEarn = () => {
    const games = [
        { id: 1, name: 'Daily Spin', reward: 'Up to $1.00', icon: <FaDice className="text-orange-500" />, type: 'Luck' },
        { id: 2, name: 'Quiz Master', reward: '$0.05 per quiz', icon: <FaQuestionCircle className="text-blue-500" />, type: 'Knowledge' },
        { id: 3, name: 'Match 3', reward: 'Based on Score', icon: <FaGamepad className="text-green-500" />, type: 'Skill' },
    ];

    return (
        <Layout>
            <div className="bg-base-200 py-3 md:py-10 px-3 md:px-8 shadow-inner text-base-content">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-center mb-8 md:mb-12 gap-6 bg-primary p-6 md:p-12 rounded-[1.5rem] md:rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 text-center lg:text-left">
                            <h1 className="text-2xl md:text-5xl font-black mb-4 flex items-center justify-center lg:justify-start gap-4">
                                <FaGamepad /> Play & Earn
                            </h1>
                            <p className="text-sm md:text-xl opacity-80 max-w-xl">Entertainment meets earnings. Play fun mini-games and earn rewards directly in your wallet.</p>
                        </div>
                        <div className="relative z-10 bg-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-md border border-white/20 text-center min-w-[180px] md:min-w-[200px]">
                            <p className="text-xs md:text-sm font-bold uppercase opacity-60 mb-1">Weekly Prize Pool</p>
                            <p className="text-3xl md:text-4xl font-black">$500</p>
                            <button className="btn btn-xs md:btn-sm btn-white mt-4 rounded-xl text-primary font-bold px-6">Rankings</button>
                        </div>
                        <FaDice className="absolute -bottom-10 -left-10 text-white opacity-10 hidden md:block" size={250} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {games.map(game => (
                            <div key={game.id} className="bg-base-100 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-base-content/5 group hover:-translate-y-2 transition-all">
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform flex justify-center">{game.icon}</div>
                                <h3 className="text-2xl font-black mb-2 text-center">{game.name}</h3>
                                <div className="flex justify-center mb-6">
                                    <span className="badge badge-primary badge-outline font-bold px-4 py-3">{game.type}</span>
                                </div>
                                <div className="bg-base-200 p-4 rounded-2xl mb-8 flex justify-between items-center">
                                    <span className="text-xs font-bold opacity-50 uppercase tracking-widest">Reward</span>
                                    <span className="text-success font-black flex items-center gap-1"><FaCoins /> {game.reward}</span>
                                </div>
                                <button className="btn btn-primary btn-block rounded-2xl h-14 text-lg font-black shadow-lg shadow-primary/20">Play Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PlayAndEarn;
