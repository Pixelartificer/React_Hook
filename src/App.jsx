import Hooks from "./hooks/Hooks";
import UseActionState from "./hooks/useActionState";
import UseCallback from "./hooks/useCallback";
import UseContext from "./hooks/UseContext";
import DebugValueExample from "./hooks/UseDebugValue";
import UseDeferredValue from "./hooks/UseDeferredValue";
import UseId from "./hooks/UseId";
import UseImperativeHandle from "./hooks/UseImperativeHandle";
import UseInsertionEffect from "./hooks/UseInsertionEffect";
import UseLayoutEffect from "./hooks/UseLayoutEffect";
import UseMemo from "./hooks/UseMemo";
import UseOptimistic from "./hooks/UseOptimistic";
import UseReducerExample  from "./hooks/UseReducer";
import UseRef from "./hooks/UseRef";
import UseState from "./hooks/UseState";
import UseTransition from "./hooks/UseTransition";
import CustomHooks from "./hooks/CustomHooks";




function App() {
  return (
    <>
      <Hooks />
      <UseActionState />
      <UseCallback />
      <UseContext />
      <DebugValueExample />
      <UseDeferredValue />
      <UseId />
      <UseImperativeHandle />
      <UseInsertionEffect />
      <UseLayoutEffect />
      <UseMemo />
      <UseOptimistic />
      <UseReducerExample />
      <UseRef />
      <UseState />
      <UseTransition />
      <CustomHooks />
    </>
  );
}

export default App;
