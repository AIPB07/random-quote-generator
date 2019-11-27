// URL for quote API. Credit: https://github.com/lukePeavey/quotable
const quoteURL = 'https://api.quotable.io/random';

// React hooks
const useState = React.useState;
const useEffect = React.useEffect;

// Main stateful component (will make API calls and store quote data)
function Controller() {
	// Declare new state variable quote
	const [quote, setQuote] = useState({content: '', author: ''});

	const getQuote = () => {
		// Call random quote API
		let content = '';
		let author = '';
		$.getJSON(quoteURL, function (data) {
			content = data.content;
			author = data.author;
			setQuote({
				content: content,
				author: author
			});
		});
	};

	useEffect(getQuote, []);
	
	return(
		<div>
			<QuoteContent content={quote.content}/>
			<QuoteAuthor author={quote.author}/>
			<div class="d-flex justify-content-between">
				<button id ="new-quote" type="button" className="btn btn-dark" onClick={getQuote}>New Quote</button>
				<a id="tweet-quote" className="btn btn-dark" href="https://twitter.com/intent/tweet"><i className="fab fa-twitter"></i></a>
			</div>
		</div>
	);
	
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