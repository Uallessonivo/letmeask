import "../styles/questions.scss";
import { ReactNode } from "react";
import cx from "classnames";

type QuestionsProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isHighlighted?: boolean;
  isAnswered?: boolean;
};

export function Question({
  content,
  author,
  children,
  isHighlighted = false,
  isAnswered = false,
}: QuestionsProps) {
  return (
    <>
      <div
        className={cx(
          "question",
          { answered: isAnswered },
          { highlighted: isHighlighted && !isAnswered }
        )}
      >
        <p>{content}</p>
        <footer>
          <div className="user-info">
            <img src={author.avatar} alt={author.name} />
            <span>{author.name}</span>
          </div>
          <div>{children}</div>
        </footer>
      </div>
    </>
  );
}
