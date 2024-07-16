import styled from 'styled-components';

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px; /* เพิ่มช่องว่างระหว่าง radio buttons */
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledRadio = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: ${props => (props.checked ? 'tomato' : 'white')};
  border-radius: 50%;
  transition: all 150ms;
  border: 2px solid tomato;
  position: relative;
  cursor: pointer;

  ${HiddenRadio}:focus + & {
    box-shadow: 0 0 0 3px rgba(255, 99, 71, 0.5);
  }

  ${HiddenRadio}:hover + & {
    background: rgba(255, 99, 71, 0.5);
  }

  &::after {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    transition: all 150ms;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: ${props => (props.checked ? 1 : 0)};
  }
`;

const RadioLabel = styled.label`
  margin-left: 12px;
  font-size: 12px;
  color: #333;
  cursor: pointer;
`;

export { RadioWrapper, HiddenRadio, StyledRadio, RadioLabel };
