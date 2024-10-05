import Table from "../../UI/Table";
import toLocalDateShort from "../../utils/tolocalDateShort";
import { toPersianNumbersWithComma } from "../../utils/toPersianNumbers";
import truncateText from "../../utils/truncateText";

import { HiOutlineTrash } from "react-icons/hi";
import { TbPencilMinus } from "react-icons/tb";
import Modal from "./../../UI/Modal";
import { useState } from "react";

function ProjectRow({ project, index }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{truncateText(project.title, 16)}</td>
      <td>{project.category.title}</td>
      <td>{toPersianNumbersWithComma(project.budget)}</td>
      <td>{toLocalDateShort(project.deadline)}</td>
      <td>
        <div className="flex flex-wrap items-center gap-2 max-w-[200px]">
          {project.tags.map((tag) => (
            <span className="badge badge-secondary" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td>{project.freelancer?.name || "-"}</td>
      <td>
        {project.status === "open" ? (
          <span className="badge badge--success">باز</span>
        ) : (
          <span className="badge badge--danger">بسته</span>
        )}
      </td>
      <td>
        <div className="flex items-center gap-x-4">
          <button onClick={() => setIsEditOpen(true)}>
            <TbPencilMinus className="w-5 h-5 text-primary-900" />
          </button>
          <Modal
            title="Modal Title."
            open={isEditOpen}
            onClose={() => setIsEditOpen(false)}>
            this is a Modal !
          </Modal>
          <button>
            <HiOutlineTrash className="w-5 h-5 text-error" />
          </button>
        </div>
      </td>
    </Table.Row>
  );
}

export default ProjectRow;
