import { useState } from "react";

type AnswerAddComponentProps = {
    onSubmit: (data: { content: string; writer: string }) => void;
};

function AnswerAddComponent({ onSubmit }: AnswerAddComponentProps) {
    const [content, setContent] = useState("");
    const [writer, setWriter] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ content, writer });
        setContent("");
        setWriter("");
    };

    return (
        <form onSubmit={handleSubmit}>
      <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your answer..."
      />
            <input
                type="text"
                value={writer}
                onChange={(e) => setWriter(e.target.value)}
                placeholder="Your name"
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default AnswerAddComponent;
