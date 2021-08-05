import React, { ReactNode, useRef, useState } from "react";
import { List } from "../../models";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonItem,
} from "@ionic/react";
import { chevronDownOutline, chevronForwardOutline } from "ionicons/icons";

interface Props {
  list: List;
  isDraggingOver: boolean;
  children: ReactNode[];
  onEditName: Function;
}

const DropdownList: React.FC<Props> = ({
  list,
  isDraggingOver,
  children,
  onEditName,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newTitle, setNewTitle] = useState(list.name);
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState(false);
  const inputRefEle = useRef<HTMLIonInputElement>(null);

  const handleSetEditing = (e: React.MouseEvent) => {
    inputRefEle.current!.focus();
  };

  const handleBlur = () => {
    setIsCurrentlyEditing(false);
    onEditName(newTitle);
  };

  return (
    <IonCard color={isDraggingOver ? "light" : "none"}>
      <IonCardHeader>
        <IonItem lines="none" color="none">
          <IonButtons slot="start">
            <IonButton onClick={() => setIsExpanded(!isExpanded)}>
              <IonIcon
                icon={isExpanded ? chevronDownOutline : chevronForwardOutline}
              />
            </IonButton>
          </IonButtons>
          <IonCardTitle>
            <IonInput
              onClick={handleSetEditing}
              ref={inputRefEle}
              className={isCurrentlyEditing ? "bg-green" : ""}
              value={newTitle}
              onIonChange={(e) => setNewTitle(e.detail.value!)}
              onIonFocus={() => setIsCurrentlyEditing(true)}
              onIonBlur={handleBlur}
            />
          </IonCardTitle>
        </IonItem>
      </IonCardHeader>

      {isExpanded && (
        <IonCardContent>
          {children}
        </IonCardContent>
      )}
    </IonCard>
  );
};

export default DropdownList;