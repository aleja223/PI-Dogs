import { useState } from "react";

const Form = () => {
  const [form, setForm, setState] = useState({
    nombre: "",
    altura: "",
    peso: "",
    peso: "",
    años_de_vida: "",
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventtDfault();
  };

  return (
    <form handleSubmit={handleSubmit}>
      <div>
        <label>Nombre: </label>
        <input
          nombre="nomre"
          onChange={handleChange}
          type="text"
          value={form.nombre}
        />
      </div>
      <div>
        <label>Altura: </label>
        <input
          altura="altura"
          onChange={handleChange}
          type="text"
          value={form.altura}
        />
      </div>
      <div>
        <label>Peso: </label>
        <input
          peso="peso"
          onChange={handleChange}
          type="text"
          value={form.peso}
        />
      </div>
      <div>
        <label>años_de_vida: </label>
        <input
          años_de_vida="años_de_vida"
          onChange={handleChange}
          type="text"
          value={form.años_de_vida}
        />
      </div>

      <imput onChange={handleChange} type="submit" disabled={false} />
    </form>
  );
};
/*
export default Form;
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, postRecipe } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./Form.css";
import validation from "../Validation/validations";
import Modal from "../../components/Modal/Modal";

export default function Form() {
  const dispatch = useDispatch();

  const allRecipes = useSelector((state) => state.allRecipes);
  const allDiets = useSelector((state) => state.allDiets);

  const [recipeName, setRecipeName] = useState("");
  const [recipeSummary, setRecipeSummary] = useState("");
  const [recipeHealthScore, setRecipeHealthScore] = useState(0);
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState("");
  const [recipeDiets, setRecipeDiets] = useState("");
  const [errors, setErrors] = useState({});
  const [errorStep, setErrorStep] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [editingStep, setEditingStep] = useState(null);
  const [editingStepIndex, setEditingStepIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [recipeCreatedMessageVisible, setRecipeCreatedMessageVisible] =
    useState(false);

  const isStepButtonDisabled = useCallback(() => {
    if (currentStep.length < 10) {
      setErrorStep(
        "Minimum characters for the step description: 10 characters"
      );
      setDisabled(true);
    } else if (currentStep.length > 350) {
      setErrorStep(
        "Maximum characters for the step description: 350 characters"
      );
      setDisabled(true);
    } else {
      setErrorStep("");
      setDisabled(false);
    }
  }, [currentStep]);

  const isSubmitButtonEnabled = useCallback(() => {
    return (
      currentStep.length >= 10 &&
      currentStep.length <= 350 &&
      errors.name === undefined &&
      errors.summary === undefined &&
      errors.image === undefined
    );
  }, [currentStep, errors]);

  useEffect(() => {
    dispatch(getAllDiets());

    const validations = validation(
      {
        name: recipeName,
        summary: recipeSummary,
        image: recipeImage,
        steps: recipeSteps,
        diet: recipeDiets,
      },
      allRecipes
    );

    setDisabled(isStepButtonDisabled());
    setErrorStep("");
    setErrors(validations);
  }, [
    dispatch,
    recipeName,
    recipeSummary,
    recipeImage,
    currentStep,
    recipeSteps,
    recipeDiets,
    disabled,
    errorStep,
    allRecipes,
    isStepButtonDisabled,
    allDiets,
  ]);

  const handleAddStep = () => {
    setRecipeSteps([...recipeSteps, currentStep]);
    setCurrentStep("");
    document.getElementById("currentStep").value = currentStep;
  };

  const handleEditStep = (index) => {
    const step = recipeSteps[index];
    setEditingStep(step);
    setCurrentStep(step);
    setEditingStepIndex(index);
  };

  const handleSaveStep = () => {
    if (editingStep && editingStepIndex !== -1) {
      const updatedSteps = [...recipeSteps];
      updatedSteps[editingStepIndex] = currentStep;
      setRecipeSteps(updatedSteps);
      setEditingStep(null);
      setEditingStepIndex(-1);
      setCurrentStep("");
    }
  };

  const handleDeleteStep = (index) => {
    setRecipeSteps((previousSteps) =>
      previousSteps.filter((_, i) => i !== index)
    );
  };

  const handleDiets = (event) => {
    if (event.target.checked) {
      setRecipeDiets([...recipeDiets, event.target.value]);
    } else {
      setRecipeDiets(recipeDiets.filter((diet) => diet !== event.target.value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const recipeToAdd = {
      name: recipeName,
      summary: recipeSummary,
      image: recipeImage,
      steps: [...recipeSteps],
      healthScore: recipeHealthScore,
      diets: [...recipeDiets],
    };

    try {
      setShowModal(true);

      dispatch(postRecipe(recipeToAdd));
      setRecipeName("");
      setRecipeImage("");
      setRecipeSummary("");
      setRecipeSteps([]);
      setCurrentStep("");
      setRecipeHealthScore(0);
      setRecipeDiets([]);
      setRecipeCreatedMessageVisible(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            recipeCreatedMessageVisible={recipeCreatedMessageVisible}>
            <div>
              {recipeCreatedMessageVisible && <h1>RECIPE CREATED</h1>}
              <Link to="/home">Return home</Link>
            </div>
          </Modal>

          <div>
            <label>NAME</label>
            <input
              type="text"
              name="name"
              placeholder="Enter the name of the recipe"
              value={recipeName}
              onChange={(event) => setRecipeName(event.target.value)}
            />
            <div className="error">
              {errors.name && <span>{errors.name}</span>}
            </div>
          </div>

          <div>
            <label>SUMMARY</label>
            <textarea
              name="summary"
              placeholder="Enter a recipe summary"
              value={recipeSummary}
              onChange={(event) => setRecipeSummary(event.target.value)}
            />
            <div className="error">
              {errors.summary && <span>{errors.summary}</span>}
            </div>
          </div>

          <div>
            <label>IMAGE</label>
            <input
              type="text"
              name="image"
              placeholder="Enter the URL of your image"
              onChange={(event) => setRecipeImage(event.target.value)}
            />
            <div className="error">
              {errors.image && <span>{errors.image}</span>}
            </div>
          </div>

          <div>
            <label>STEPS</label>
            <button
              className="addStepButton"
              type="button"
              onClick={editingStep ? handleSaveStep : handleAddStep}
              disabled={editingStep || errorStep ? disabled : false}>
              {editingStep ? "Save Step" : "Add Step"}
            </button>

            {editingStep && (
              <button
                className="cancelButton"
                type="button"
                onClick={() => {
                  setEditingStep("");
                  setCurrentStep("");
                }}>
                Cancel
              </button>
            )}
            <div>
              <textarea
                value={currentStep}
                placeholder="Enter a step"
                onChange={(event) => {
                  setCurrentStep(event.target.value);
                  isStepButtonDisabled();
                }}
              />
              <div className="error">
                {errors.steps && <span>{errors.steps}</span>}
              </div>
              <div className="error">
                {errorStep && <span>{errorStep}</span>}
              </div>
            </div>
            <ul>
              {recipeSteps.map((step, index) => {
                return (
                  <li key={index}>
                    {index + 1} - {step}
                    <button
                      className="editButton"
                      type="button"
                      onClick={() => handleEditStep(index)}>
                      Edit
                    </button>
                    <button
                      className="deleteButton"
                      type="button"
                      onClick={() => handleDeleteStep(index)}>
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <label>HEALTH SCORE {recipeHealthScore}</label>
            <div>
              <input
                type="range"
                name="healthScore"
                value={recipeHealthScore}
                onChange={(event) => setRecipeHealthScore(event.target.value)}
              />
            </div>
          </div>
          <div className="diets-container">
            <label>DIETS</label>
            <div>
              {allDiets?.map((diet) => (
                <label className="diet-name" key={diet.name}>
                  <input
                    type="checkbox"
                    className="diet-input"
                    name={diet.name}
                    value={diet.name}
                    onChange={(event) => handleDiets(event)}
                  />
                  {diet.name.toUpperCase()}
                </label>
              ))}
            </div>
            <div className="error">
              {errors.diet && <span>{errors.diet}</span>}
            </div>
          </div>
          <button
            className="boton"
            type="submit"
            disabled={
              !isSubmitButtonEnabled() || Object.keys(errors).length > 0
            }>
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}*/
/*import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, postRecipe } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./Form.css";
import validation from "../Validation/validations";
import Modal from "../../components/Modal/Modal";*/

/*export default function Form() {
  const dispatch = useDispatch();

  const allRecipes = useSelector((state) => state.allRecipes);
  const allDiets = useSelector((state) => state.allDiets);

  const [recipeName, setRecipeName] = useState("");
  const [recipeSummary, setRecipeSummary] = useState("");
  const [recipeHealthScore, setRecipeHealthScore] = useState(0);
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState("");
  const [recipeDiets, setRecipeDiets] = useState([]);
  const [errors, setErrors] = useState({});
  const [errorStep, setErrorStep] = useState("");
  const [editingStepIndex, setEditingStepIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  const isStepButtonDisabled = useMemo(() => {
    if (currentStep.length < 10) {
      setErrorStep(
        "Minimum characters for the step description: 10 characters"
      );
      return true;
    } else if (currentStep.length > 350) {
      setErrorStep(
        "Maximum characters for the step description: 350 characters"
      );
      return true;
    } else {
      setErrorStep("");
      return false;
    }
  }, [currentStep]);

  const handleAddStep = () => {
    setRecipeSteps([...recipeSteps, currentStep]);
    setCurrentStep("");
  };

  const handleEditStep = (index) => {
    const step = recipeSteps[index];
    setCurrentStep(step);
    setEditingStepIndex(index);
  };

  const handleSaveStep = () => {
    if (editingStepIndex !== -1) {
      const updatedSteps = [...recipeSteps];
      updatedSteps[editingStepIndex] = currentStep;
      setRecipeSteps(updatedSteps);
      setEditingStepIndex(-1);
      setCurrentStep("");
    }
  };

  const handleDeleteStep = (index) => {
    setRecipeSteps((previousSteps) =>
      previousSteps.filter((_, i) => i !== index)
    );
  };

  const handleDiets = useCallback((event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setRecipeDiets((prevDiets) => [...prevDiets, value]);
    } else {
      setRecipeDiets((prevDiets) => prevDiets.filter((diet) => diet !== value));
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validations = validation(
      {
        name: recipeName,
        summary: recipeSummary,
        image: recipeImage,
        steps: recipeSteps,
        diet: recipeDiets,
      },
      allRecipes
    );

    setErrors(validations);

    if (Object.keys(validations).length === 0) {
      const recipeToAdd = {
        name: recipeName,
        summary: recipeSummary,
        image: recipeImage,
        steps: [...recipeSteps],
        healthScore: recipeHealthScore,
        diets: [...recipeDiets],
      };

      try {
        setShowModal(true);
        await dispatch(postRecipe(recipeToAdd));

        setRecipeName("");
        setRecipeImage("");
        setRecipeSummary("");
        setRecipeSteps([]);
        setCurrentStep("");
        setRecipeHealthScore(0);
        setRecipeDiets([]);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const isSubmitButtonEnabled =
    recipeSteps.length > 0 && Object.keys(errors).length === 0;

  return (
    <div className="container">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <div>
              <span></span>
              <h1>RECIPE CREATED</h1>
              <Link to="/home">Return home</Link>
            </div>
          </Modal>
          <div>
            <label>NAME</label>
            <input
              type="text"
              name="name"
              placeholder="Enter the name of the recipe"
              value={recipeName}
              onChange={(event) => setRecipeName(event.target.value)}
            />
            <div className="error">
              {errors.name && <span>{errors.name}</span>}
            </div>
          </div>

          <div>
            <label>SUMMARY</label>
            <textarea
              name="summary"
              placeholder="Enter a recipe summary"
              value={recipeSummary}
              onChange={(event) => setRecipeSummary(event.target.value)}
            />
            <div className="error">
              {errors.summary && <span>{errors.summary}</span>}
            </div>
          </div>

          <div>
            <label>IMAGE</label>
            <input
              type="text"
              name="image"
              placeholder="Enter the URL of your image"
              onChange={(event) => setRecipeImage(event.target.value)}
            />
            <div className="error">
              {errors.image && <span>{errors.image}</span>}
            </div>
          </div>

          <div>
            <label>STEPS</label>
            <button
              className="addStepButton"
              type="button"
              onClick={editingStepIndex !== -1 ? handleSaveStep : handleAddStep}
              disabled={editingStepIndex !== -1 || errorStep ? true : false}>
              {editingStepIndex !== -1 ? "Save Step" : "Add Step"}
            </button>

            {editingStepIndex !== -1 && (
              <button
                className="cancelButton"
                type="button"
                onClick={() => {
                  setEditingStepIndex(-1);
                  setCurrentStep("");
                }}>
                Cancel
              </button>
            )}
            <div>
              <textarea
                value={currentStep}
                placeholder="Enter a step"
                onChange={(event) => {
                  setCurrentStep(event.target.value);
                  isStepButtonDisabled();
                }}
              />
              <div className="error">
                {errors.steps && <span>{errors.steps}</span>}
              </div>
              <div className="error">
                {errorStep && <span>{errorStep}</span>}
              </div>
            </div>
            <ul>
              {recipeSteps.map((step, index) => {
                return (
                  <li key={index}>
                    {index + 1} - {step}
                    <button
                      className="editButton"
                      type="button"
                      onClick={() => handleEditStep(index)}>
                      Edit
                    </button>
                    <button
                      className="deleteButton"
                      type="button"
                      onClick={() => handleDeleteStep(index)}>
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <label>HEALTH SCORE {recipeHealthScore}</label>
            <div>
              <input
                type="range"
                name="healthScore"
                value={recipeHealthScore}
                onChange={(event) => setRecipeHealthScore(event.target.value)}
              />
            </div>
          </div>

          <div className="diets-container">
            <label>DIETS</label>
            <div>
              {allDiets?.map((diet) => (
                <label className="diet-name" key={diet.name}>
                  <input
                    type="checkbox"
                    className="diet-input"
                    name={diet.name}
                    value={diet.name}
                    onChange={(event) => handleDiets(event)}
                  />
                  {diet.name.toUpperCase()}
                </label>
              ))}
            </div>
            <div className="error">
              {errors.diet && <span>{errors.diet}</span>}
            </div>
          </div>

          <button
            className="boton"
            type="submit"
            disabled={!isSubmitButtonEnabled}>
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}*/
