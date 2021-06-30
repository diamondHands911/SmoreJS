import React, { FunctionComponent } from 'react';
import lodash from 'lodash'
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';
import {TextField, Button} from '@material-ui/core/';
import 'typeface-roboto'
import atoms from '../atoms';
import { getFiberRoot, getRecoilData } from '../FiberParsingAlgo.tsx';

const ImportForm : FunctionComponent = ({}) =>{
  const [text, setText] = useRecoilState(atoms.textState)
  const [iframe, setIframe] = useRecoilState(atoms.iframeState) 
  const textValue = useRecoilValue(atoms.textState)
  const iframeValue = useRecoilValue(atoms.iframeState)
  const [testLog, setTestLog]: any[] = useRecoilState(atoms.recoilLog);
  const [reactValue, setReactValue] = useRecoilState(atoms.reactState);
<<<<<<< HEAD
  const [recoilObject, setRecoilObject] = useRecoilState(atoms.recoilObj)
=======
  const [recoilObject, setRecoilObject] = useRecoilState(atoms.recoilObj);

function handleSubmit(){
  setIframe(text);
}

const handleChange = (e: object) =>{
  setText(e.target.value)
}
>>>>>>> main

  function handleSubmit(){
    setIframe(text);
  }

  const handleChange = (e: object) =>{
    setText(e.target.value)
  }

  type atomSelectorValuesNonDefault = {
    edit: number,
    key: string,
    values: any,
    updated: boolean,
    isAtom: boolean,
    isSelector: boolean,
  }

  type recoilObj = {
    version: number,
    stateID: number,
    dirtyAtoms: any[],
    currentEdit: number,
    knownAtoms: any[],
    knownSelectors: any[],
    atomSelectorValuesNonDefault: any[],
  }

  const setIterator = (setObj: any ) => {
    const result: any[] = []
    setObj.forEach(el => {
      result.push(el);
    })
    return result;
  }

  const getAtomSelectorValues = (children: any, recoilObj) => {
    function updated(childName: any){
      if (recoilObj.currentEdit === childName) return true;
      return false
    }
    function isAtom (childName: any){
      if (recoilObj.knownAtoms.includes(childName)) return true;
      return false
    }
    function isSelector (childName: any){
      if (recoilObj.knownSelectors.includes(childName)) return true;
      return false
    }

  //declaring the results arr
  const result : any[] = [];
  //iterate over the children
  for (let i = 0; i < children.length; i += 1){
    const child: atomSelectorValuesNonDefault = {
      edit: children[i]?.edit,
      key: children[i]?.key,
      values: children[i].value?.contents,
      updated: updated(children[i]?.edit),
      isAtom: isAtom(children[i]?.key),
      isSelector: isSelector(children[i]?.key),
    }
    result.push(child);
  }
  return result;
}

const handleClick = () => {
  const checkRecoil: any = getFiberRoot();
  console.log(checkRecoil)
  if (JSON.stringify(checkRecoil) !== JSON.stringify(reactValue)) {
    const currentRecoilData = getRecoilData(checkRecoil); // --> currentRecoil Data
    const recoilObj: recoilObj = {
      version: currentRecoilData.currentTree.version,
      stateID: currentRecoilData.currentTree.stateID,
      dirtyAtoms: setIterator(currentRecoilData.currentTree.dirtyAtoms),
      currentEdit: currentRecoilData.currentTree.atomValues._hamt?._edit,
      knownAtoms: setIterator(currentRecoilData.knownAtoms),
      knownSelectors: setIterator(currentRecoilData.knownSelectors),
      atomSelectorValuesNonDefault: [],
    }
    // console.log(typeof currentRecoilData.currentTree.atomValues);
    recoilObj.atomSelectorValuesNonDefault = getAtomSelectorValues(currentRecoilData.currentTree.atomValues._hamt._root.children, recoilObj)
<<<<<<< HEAD
    
    testLog[0] ? setTestLog([...testLog ,recoilObj]) : setTestLog([recoilObj])
    
    // recoilObj.atomSelectorValuesNonDefault.forEach(el => {
=======

    if (testLog[0]) {
      setTestLog([...testLog ,lodash.cloneDeep(reactValue)])
    }
    else {
      setTestLog([reactValue])
    }
    console.log('recoil', checkRecoil);
    console.log('testlog', recoilObj);

>>>>>>> main
    setRecoilObject(recoilObj);
    setReactValue(checkRecoil);
  }
}
  return (
    <>
    
<div id ="importForm">
  <div id="importFormButton">
      <h3>localhost app</h3>
      <div id="dash">
      <form noValidate autoComplete="off">
      <TextField id="standard-basic" value={textValue} label='App address' onChange={handleChange}  />
      </form>
      
      <Button variant="contained" color="primary"onClick={handleSubmit}> Load </Button>
      <Button variant="contained" color="primary" onClick={handleClick}> Update</Button>
      </div>
  </div>
    <iframe id="frameId" src={iframeValue} ></iframe>
</div>
    </>
)
}

export default ImportForm