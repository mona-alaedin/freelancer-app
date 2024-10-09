import { TagsInput } from "react-tag-input-component";
import RHFSelect from "../../UI/RHFSelect";
import TextField from "../../UI/TextField";
import { useForm } from "react-hook-form";
import { useState } from "react";

function CreateProjectForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [tags, setTags] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
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
          required: "مقدار بودجه را وارد نمایید. ضروری است.",
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
        options={[]}
      />
      <dir>
        <label className="mb-2 block text-secondary-700">تگ </label>
        <TagsInput value={tags} onChange={setTags} name="tags" />
      </dir>
      <button type="submit" className="btn btn--primary w-full">
        تایید
      </button>
    </form>
  );
}

export default CreateProjectForm;
