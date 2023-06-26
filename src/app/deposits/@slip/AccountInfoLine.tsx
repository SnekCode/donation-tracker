const breakLine = <hr className={"border-2 border-slate-800 print:block"} />;

const AccountInfo: React.FC<{
  account: number | string;
  routing: number | string;
  footer?: boolean;
  header?: boolean;
}> = ({ account, routing, footer = false, header = false }) => {
  return (
    <div
      className={`
      w-full
      counter
    ${header ? "print:fixed print:top-0" : ""}
    ${footer ? "print:fixed print:bottom-0" : ""}
    `}
    >
      {footer ? breakLine : null}
      <div
        className={`text-xl flex space-x-5 items-end`}
        style={{ fontFamily: "OCR A Std, monospace"}}
      >
        <div>&#9288;{account}&#9288;</div>
        <div className="page-number">&#9286;{routing}&#9286;</div>
        <div></div>
      </div>
      {header ? breakLine : null}
    </div>
  );
};

export default AccountInfo;
