import { TagsInput } from "react-tag-input-component";
import RHFSelect from "../../UI/RHFSelect";
import TextField from "../../UI/TextField";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePickerField from "../../UI/DatePickerField";
import useCategories from "../../hooks/useCategories";
import useCreateProject from "./useCreateProject";
import Loading from "./../../UI/Loading";
import useEditProject from "./useEditProject";

function CreateProjectForm({ onClose, projectToEdit = {} }) {
  const { _id: editId } = projectToEdit;
  const isEditSession = Boolean(editId);
  const {
    title,
    description,
    budget,
    category,
    deadline,
    tags: prevTags,
  } = projectToEdit;
  let editValues = {};

  if (isEditSession) {
    editValues = {
      title,
      description,
      budget,
      category: category._id,
    };
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: editValues });

  const [tags, setTags] = useState(prevTags || []);
  const [date, setDate] = useState(new Date(deadline || ""));
  const { categories } = useCategories();
  const { isCreating, createProject } = useCreateProject();
  const { isEditing, editProject } = useEditProject();

  const onSubmit = (data) => {
    const newProject = {
      ...data,
      deadline: new Date(date).toDateString(),
      tags,
    };

    if (isEditSession) {
      editProject(
        { id: editId, newProject },
        {
          onSuccess: () => {
            onClose();
            reset();
          },
        }
      );
    } else {
      createProject(newProject, {
        onSuccess: () => {
          onClose();
          reset();
        },
      });
    }
  };
  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="عنوان پروژه"
        name="title"
        register={register}
        required
        validationSchema={{
          required: "درج عنوان ضروری است.",
          minLength: {
            value: 10,
            message: "طول عنوان نباید کمتر از 10 کاراکتر باشد.",
          },
        }}
        errors={errors}
      />
      <TextField
        label="توضیحات"
        name="description"
        register={register}
        required
        validationSchema={{
          required: "درج توضیحات ضروری است.",
          minLength: {
            value: 15,
            message: "طول توضیحات نباید کمتر از 15 کاراکتر باشد.",
          },
        }}
        errors={errors}
      />
      <TextField
        label="بودجه"
        name="budget"
        type="number"
        register={register}
        required
        validationSchema={{
          required: "مقدار بودجه را وارد نمایید.",
          minLength: {
            value: 9,
            message: "بودجه نمیتواند کمتر از ده میلیون تومان باشد.",
          },
        }}
        errors={errors}
      />

      <RHFSelect
        label="دسته بندی"
        name="category"
        register={register}
        required
        options={categories}
      />
      <dir>
        <label className="mb-2 block text-secondary-700">تگ </label>
        <TagsInput value={tags} onChange={setTags} name="tags" />
      </dir>
      <DatePickerField date={date} setDate={setDate} label="ددلاین" />
      <div className="mt-8">
        {isCreating ? (
          <Loading />
        ) : (
          <button type="submit" className="btn btn--primary w-full">
            تایید
          </button>
        )}
      </div>
    </form>
  );
}

export default CreateProjectForm;
