function Newsletter() {
    return (
        <section className="newsletter" id="contact">

            <div className="newsletter-container">

                <h2>
                    SIGN UP FOR OUR DAILY INSIDER
                </h2>

                <form className="newsletter-form">

                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                    />

                    <button type="submit">
                        Subscribe
                    </button>

                </form>

            </div>

        </section>
    );
}

export default Newsletter;