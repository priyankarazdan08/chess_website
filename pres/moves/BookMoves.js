export default class BookMove extends React.Component {

    render() {
        if (!this.props.bookMoves) {
            return <div className="infoMessage">No book moves found in this position</div>;
        }

        return (
            <div>
                {(this.props.gameResults && this.props.gameResults.length > 0) ? this.resultsTable() : null}
                {this.movesTable()}
            </div>
        );
    }

    enableBook() {
        let newMovesSettings = { ...this.props.settings.movesSettings };
        newMovesSettings.openingBookType = 'OPENING_BOOK_TYPE_LICHESS';
        this.props.settingsChange('SETTING_NAME_MOVES_SETTINGS', newMovesSettings);
    }

    movesTable() {
        if (this.props.bookMoves.fetch === 'pending') {
            return <div className="center"><br />Loading...</div>;
        }
        if (this.props.bookMoves.fetch === 'off') {
            return this.offCard(
                'Opening book is disabled',
                'Click the button below to enable it',
                this.enableBook.bind(this),
                'Enable opening book'
            );
        }
        if (this.props.bookMoves.fetch === 'failed') {
            return this.offCard(
                'Failed to fetch book moves',
                'Please check your internet connection. Lichess could also be down.',
                this.props.forceFetchBookMoves,
                'Try again'
            );
        }

        return (
            <div>
                {/* This is a placeholder for MovesTable content */}
                {/* Render moves as per your business logic */}
                {this.props.bookMoves.moves && this.props.bookMoves.moves.map((move, index) => (
                    <div key={index}>{move}</div>
                ))}
            </div>
        );
    }

    resultsTable() {
        return (
            <div>
                {/* Placeholder for ResultsTable rendering */}
                {/* Render game results as per your business logic */}
                {this.props.gameResults && this.props.gameResults.map((result, index) => (
                    <div key={index}>{result}</div>
                ))}
            </div>
        );
    }

    offCard(title, message, onClick, buttonText) {
        return (
            <div className="offCard">
                <h3>{title}</h3>
                <p>{message}</p>
                <button onClick={onClick}>{buttonText}</button>
            </div>
        );
    }
}
