import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import data from './data.json';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState('');

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const filteredMatches = data.matches.filter(match =>
    match.team1.toLowerCase().includes(filter.toLowerCase()) ||
    match.team2.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <div className="language-switcher">
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('cs')}>CS</button>
      </div>
      <h1>{t('welcome')}</h1>
      <input
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder={t('filterPlaceholder')}
      />
      <h2>{t('teams')}</h2>
      <ul>
        {data.teams.map(team => (
          <li key={team.id}>{team.name} - {t('group')} {team.group}</li>
        ))}
      </ul>
      <h2>{t('matches')}</h2>
      <ul>
        {filteredMatches.map(match => (
          <li key={match.id}>
            {match.date} - {match.location}<br />
            {match.team1} vs {match.team2} - {match.score}
            <ul>
              {match.players.map(player => (
                <li key={player.name}>{player.name} ({player.team}) - {t('goals')}: {player.goals}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
