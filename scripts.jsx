// URL for quote API. Credit: https://github.com/lukePeavey/quotable
const quoteURL = 'https://api.quotable.io/random';

// Main stateful component (will make API calls and store quote data)
class Controller extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			quoteContent: '',
			quoteAuthor: ''
		}
		this.getQuote = this.getQuote.bind(this);
	};

	getQuote() {
		// Call random quote API
		let content = '';
		let author = '';
		$.getJSON(quoteURL, function (data) {
			content = data.content;
			author = data.author;
			this.setState({
				quoteContent: content,
				quoteAuthor: author
			});
		}.bind(this));
	};


	componentDidMount() {
		this.getQuote();
	};

	render() {
		return(
			<div>
				<QuoteContent content={this.state.quoteContent}/>
				<QuoteAuthor author={this.state.quoteAuthor}/>
				<div class="d-flex justify-content-between">
					<button id ="new-quote" type="button" className="btn btn-dark" onClick={this.getQuote}>New Quote</button>
					<a id="tweet-quote" className="btn btn-dark" href="https://twitter.com/intent/tweet"><i className="fab fa-twitter"></i></a>
				</div>
			</div>
		);
	};
}


// Component that will render quote text
function QuoteContent(props) {
	return (
		<h1 id="text">"{props.content}"</h1>
	);
}


// Component that will render quote author
function QuoteAuthor(props) {
	return (
		<p id="author">{props.author}</p>
	);
}

ReactDOM.render(<Controller />, document.getElementById('quote-box'));