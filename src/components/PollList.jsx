const PollList = ({ options }) => {
    return(
        <div>
            {options.map((option) => (
                <p key={option.id}>
                    {option.name} - {option.votes} votes
                </p>
            )
        )}
        </div>
    );
};

export default PollList;