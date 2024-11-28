import { useState, ChangeEvent, KeyboardEvent, useRef } from 'react';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { formatDateToCustomFormat } from '@/utils/dateUtils';
import type { Comment } from '@/types/comment';
import { updateComment } from '@/lib/commentService';
import styles from './CommentDetail.module.css';

export default function CommentDetail({ comment }: { comment: Comment }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { id, author } = comment;
  const [modifiableValues, setModifiableValues] = useState({
    content: comment.content,
    updatedAt: comment.updatedAt,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditing = () => {
    if (!isEditing) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }

    setIsEditing(!isEditing);
  };

  const handleOnClick = () => {
    try {
      if (isEditing) {
        handleSave();
      }
    } finally {
      handleEditing();
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModifiableValues({
      ...modifiableValues,
      content: e.target.value,
    });
  };

  const handleOnKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleSave();
      handleEditing();
      // todo: 수정성공시 토스트 박스
    }
  };

  const handleSave = async () => {
    try {
      const response = await updateComment({
        commentId: id,
        data: { content: modifiableValues.content },
      });

      setIsEditing(false);
      setModifiableValues({
        ...modifiableValues,
        content: response.content,
        updatedAt: response.updatedAt,
      });
    } catch (error) {
      console.error('댓글 저장 중 오류 발생:', error);
    }
  };

  return (
    <li className={styles.comment}>
      <Avatar name={author.nickname} className={styles.avatar} />
      <div className={styles.info}>
        <div className={styles.user}>
          <div className={styles.name}>{author.nickname}</div>
          <span className={styles.date}>
            {formatDateToCustomFormat(modifiableValues.updatedAt)}
          </span>
        </div>
        <input
          ref={inputRef}
          className={styles.content}
          value={modifiableValues.content}
          readOnly={!isEditing}
          onChange={handleOnChange}
          onBlur={() => {}}
          onKeyDown={handleOnKeyDown}
        />
        <div className={styles.buttonContainer}>
          <Button
            className={styles.button}
            type="button"
            onClick={handleOnClick}
          >
            {isEditing ? '저장' : '수정'}
          </Button>
          <Button className={styles.button}>삭제</Button>
        </div>
      </div>
    </li>
  );
}
