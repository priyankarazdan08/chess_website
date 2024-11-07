import React from 'react';

function Community() {
  return (
    <div className="community">
      {/* Header */}
      <div className="header">
        <h1>Chess Community</h1>
        <nav>
          <a href="/home">Home</a>
          <a href="/research">Research</a>
          <a href="/community">Community</a>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <h2>Join the Chess Community!</h2>
        <p>Explore forums, articles, and chess events with fellow enthusiasts.</p>
        <button>Join a Forum</button>
      </section>

      {/* Forums Section */}
      <section className="section forums">
        <h3>Popular Forums</h3>
        <div className="forum-grid">
          <div className="forum">
            <h4>General Discussion</h4>
            <p>Talk about chess strategy, tactics, and more.</p>
            <button>Enter Forum</button>
          </div>
          <div className="forum">
            <h4>Opening Theory</h4>
            <p>Discuss various chess openings with experienced players.</p>
            <button>Enter Forum</button>
          </div>
          <div className="forum">
            <h4>Chess Puzzles</h4>
            <p>Solve puzzles and improve your tactical skills.</p>
            <button>Enter Forum</button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="section news">
        <h3>Chess News</h3>
        <div className="news-grid">
          <div className="news-item">
            <h4>World Chess Championship</h4>
            <p>Follow the latest updates on the World Chess Championship.</p>
            <a href="https://chess24.com/en/news" target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
          <div className="news-item">
            <h4>AI and Chess</h4>
            <p>How artificial intelligence is shaping the future of chess.</p>
            <a href="https://www.chess.com/article/view/ai-in-chess" target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section events">
        <h3>Upcoming Chess Events</h3>
        <ul>
          <li>Chess.com Global Championship - Nov 2024</li>
          <li>FIDE World Chess Cup - Dec 2024</li>
          <li>Online Chess Tournaments - Monthly</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Chess Community © 2024</p>
        <button>Join Our Newsletter</button>
      </footer>
    </div>
  );
}

export default Community;
