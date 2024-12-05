
interface QnaItemProps {
    qna: { qno: number; title: string };
}

const QnaItemComponent = ({ qna }: QnaItemProps) => {
    return (
        <div>
            <h3>{qna.title}</h3>
            <a href={`/qna/${qna.qno}`}>상세 보기</a>
        </div>
    );
};

export default QnaItemComponent;
