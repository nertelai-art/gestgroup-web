import { Fragment } from "react";

/** Parteix un text en paraules perquè `.reveal-words` les faci entrar una a una. `offset` continua el compte. */
export function Words({ text, offset = 0, className }: { text: string; offset?: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className={`w ${className ?? ""}`} style={{ "--w": offset + i } as React.CSSProperties}>
            {word}
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}
