import { useState, ChangeEvent, KeyboardEvent, useRef } from 'react';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { formatDateToCustomFormat } from '@/utils/dateUtils';
import type { Comment } from '@/types/comment';
import { deleteComment, updateComment } from '@/lib/commentService';
import styles from './CommentDetail.module.css';

export default function CommentDetail({ comment }: { comment: Comment }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { id, author } = comment;
  const [content, setContent] = useState(comment.content);
  const [updatedAt, setUpdatedAt] = useState(comment.updatedAt);

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
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
      toggleEditing();
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleOnKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleSave();
      toggleEditing();
      // todo: 수정성공시 토스트 박스
    }
  };

  const handleSave = async () => {
    try {
      const response = await updateComment({
        commentId: id,
        data: { content },
      });

      setIsEditing(false);
      setContent(response.content);
      setUpdatedAt(response.updatedAt);
    } catch (error) {
      console.error('댓글 저장 중 오류 발생:', error);
    }
  };

  const handleDelete = async () => {
    await deleteComment(id);
  };

  return (
    <li className={styles.comment}>
      <Avatar name={author.nickname} className={styles.avatar} />
      <div className={styles.info}>
        <div className={styles.user}>
          <div className={styles.name}>{author.nickname}</div>
          <span className={styles.date}>
            {formatDateToCustomFormat(updatedAt)}
          </span>
        </div>
        <input
          ref={inputRef}
          className={styles.content}
          value={content}
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
          <Button className={styles.button} onClick={handleDelete}>
            삭제
          </Button>
        </div>
      </div>
    </li>
  );
}
