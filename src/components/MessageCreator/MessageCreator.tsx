import React, { FC, useState } from 'react';
import messages from '@/messages/es/elden-ring.json';
import TarnishedButton from '@/components/TarnishedButton/TarnishedButton';
import './MessageCreator.scss';

type WordType = keyof typeof messages.words.wordTemplates;

type WordTypeOption = {
  label: string,
  value: WordType
}

interface MessageForm {
  template: string,
  wordType: WordType,
  wordTemplate: string,
  conjunction?: string,
  templateLineTwo?: string,
  wordTypeLineTwo?: WordType,
  wordTemplateLineTwo?: string,
}

interface MessageCreatorProps {
  onMessage: (message: string) => void;
}

const MessageCreator: FC<MessageCreatorProps> = ({ onMessage }) => {

  const [defaultTemplate] = messages.templates;
  const [defaultWordType] = messages.words.types as WordTypeOption[];
  const [defaultWordTemplate] = messages.words.wordTemplates[defaultWordType.value];
  const [defaultConjunction] = messages.conjuntion;

  const [isExtendedFormat, updateExtendedFormat] = useState<boolean>(false);

  const [form, updateForm] = useState<MessageForm>({
    template: defaultTemplate,
    wordType: defaultWordType.value,
    wordTemplate: defaultWordTemplate,
    conjunction: defaultConjunction,
    templateLineTwo: defaultTemplate,
    wordTypeLineTwo: defaultWordType.value,
    wordTemplateLineTwo: defaultWordTemplate
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLSelectElement>, field: string) => {
    updateForm((prevForm) => ({
      ...prevForm,
      [field]: event.target.value
    }));
  };

  const createFormController = (field: string) => {
    return (event: React.ChangeEvent<HTMLSelectElement>) => {
      handleFormChange(event, field);
    };
  };

  const handleFinishMessage = () => {
    const result = createMessage();
    onMessage(result);
  };

  const alternateMessageFormat = () => {
    updateExtendedFormat((isExtendedFormat) => (!isExtendedFormat));
  };

  const createLine = (template: string, wordTemplate: string) => {
    return template.replaceAll('****', wordTemplate);
  };

  const createMessage = () => {

    return !isExtendedFormat
      ? createLine(form.template, form.wordTemplate)
      : `${createLine(form.template, form.wordTemplate)} ${form.conjunction} ${createLine(form.templateLineTwo || '', form.wordTemplateLineTwo || '')}`;
  };


  return (
    <div className='MessageCreator'>
      <div className='MessageCreator_content'>
        <hr/>

        <div className='MessageCreator_field'>
          <label> Plantillas </label>
          <select value={form.template} onChange={createFormController('template')}>
            {
              messages.templates.map((template, index) => (
                <option className="Select__option" value={template} key={index}> {template} </option>
              ))
            }
          </select>
        </div>

        <div className='MessageCreator_field'>

          <label> Palabras </label>
          <select value={form.wordType} onChange={createFormController('wordType')}>
            {
              messages.words.types.map((wordType, index) => (
                <option className="Select__option" value={wordType.value} key={index}> {wordType.label} </option>
              ))
            }
          </select>

          <select disabled={form.wordType === undefined}
                  value={form.wordTemplate}
                  onChange={createFormController('wordTemplate')}>
            {
              form.wordType !== undefined &&
              messages.words.wordTemplates[form.wordType] !== undefined &&
              messages.words.wordTemplates[form.wordType].map((wordTemplate, index) => (
                <option className="Select__option" value={wordTemplate} key={index}> {wordTemplate} </option>
              ))
            }
          </select>
        </div>

        {
          isExtendedFormat && (
            <React.Fragment>

              <div className='MessageCreator_field'>
                <label> Conjunciones </label>
                <select value={form.conjunction} onChange={createFormController('conjunction')}>
                  {
                    messages.conjuntion.map((conjunction) => (
                      <option className="Select__option" value={conjunction}> {conjunction} </option>
                    ))
                  }
                </select>
              </div>

              <div className='MessageCreator_field'>
                <label> Plantillas (2<sup>o</sup> linea) </label>
                <select value={form.templateLineTwo} onChange={createFormController('templateLineTwo')}>
                  {
                    messages.templates.map((template, index) => (
                      <option className="Select__option" value={template} key={index}> {template} </option>
                    ))
                  }
                </select>
              </div>

              <div className='MessageCreator_field'>

                <label> Palabras (2<sup>o</sup> linea) </label>

                <select value={form.wordTypeLineTwo} onChange={createFormController('wordTypeLineTwo')}>
                  {
                    messages.words.types.map((wordType) => (
                      <option className="Select__option" value={wordType.value}> {wordType.label} </option>
                    ))
                  }
                </select>

                <select disabled={form.wordTypeLineTwo === undefined}
                        value={form.wordTemplateLineTwo}
                        onChange={createFormController('wordTemplateLineTwo')}>
                  {
                    form.wordTypeLineTwo !== undefined &&
                    messages.words.wordTemplates[form.wordTypeLineTwo] !== undefined &&
                    messages.words.wordTemplates[form.wordTypeLineTwo].map((wordTemplate) => (
                      <option className="Select__option" value={wordTemplate}> {wordTemplate} </option>
                    ))
                  }
                </select>
              </div>

            </React.Fragment>
          )
        }

        <div className='FinishButtonContainer'>
          <TarnishedButton onClick={handleFinishMessage}>
            Terminar
          </TarnishedButton>
        </div>

        <div className='MoreActionsContainer'>
          <TarnishedButton onClick={alternateMessageFormat}>
            Alternar formato de mensaje
          </TarnishedButton>
        </div>
      </div>
    </div>
  );
};

export default MessageCreator;
