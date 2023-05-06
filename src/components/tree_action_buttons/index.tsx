import React, {type ChangeEvent, useEffect, useRef, useState} from 'react';
import {DeleteFilled, EditFilled} from '@ant-design/icons';
import styles from './tree_action_buttons.module.scss';
import {Button} from 'antd';
import {deleteFolderById} from '@/services/endpoints';
import {httpDelete} from '@/services/http';
import {type DataNode} from 'antd/es/tree';

type TreeActionButtonsProps = {
  node: DataNode;
};

export const TreeActionButtons: React.FC<TreeActionButtonsProps> = props => {
  const [textValue, setTextValue] = useState<string>(props.node.title as string);
  const editFieldRef = useRef<HTMLInputElement>(null);
  const [field, setField] = useState(false);

  function useOutsideAlerter(ref: React.RefObject<HTMLInputElement>) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setField(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(editFieldRef);

  useEffect(() => {
    if (field) {
      editFieldRef?.current?.select();
    }
  }, [field]);

  async function deleteFolder(folderId: string) {
    await httpDelete(deleteFolderById(folderId));
  }

  function deleteAction(data: any) {
    if (data.node.isLeaf) {
      console.log(data.node);
    } else {
      const folderId = data.node.key.split('-')[1];
      deleteFolder(folderId);
    }
  }
  function editAction(data: any) {
    setField(true);
  }

  return (
    <div className={styles['title_with_buttons']}>
      <div>
        <div>
          {field && typeof props.node.title == 'string' ? (
            <input
              type="text"
              ref={editFieldRef}
              className={styles['edit_field']}
              value={textValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setTextValue(event.target.value);
              }}
            />
          ) : (
            <>{textValue}</>
          )}
        </div>
        <div className={styles['action-buttons']}>
          <Button
            shape="circle"
            size="small"
            icon={<EditFilled />}
            onClick={() => editAction(props)}
          />
          <Button
            shape="circle"
            size="small"
            icon={<DeleteFilled />}
            onClick={() => deleteAction(props)}
          />
        </div>
      </div>
    </div>
  );
};
