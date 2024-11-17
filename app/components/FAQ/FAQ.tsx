import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

interface FAQProps {}

const FAQ: React.FC<FAQProps> = (props) => {
  const { data } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout?.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div>
      <div className="m-auto w-[90%] 800px:w-[80%]">
        <h1 className={`${styles.title} 800px:text-[40px]`}>Câu hỏi thường gặp</h1>
        <div className="mt-12">
          <dl className="space-y-8">
            {questions?.map((q) => (
              <div
                key={q.id}
                className={`${q._id !== questions[0]?._id && "border-t"} border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex w-full items-start justify-between text-left focus:outline-none"
                    onClick={() => toggleQuestion(q._id)}
                  >
                    <span className="font-medium text-black dark:text-white">{q.question}</span>
                    <span className="ml-6 flex-shrink-0">
                      {activeQuestion === q._id ? (
                        <HiMinus className="h-6 w-6 text-black dark:text-white" />
                      ) : (
                        <HiPlus className="h-6 w-6 text-black dark:text-white" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestion === q._id && (
                  <dd className="mt-2 pr-12">
                    <p className="font-Poppins text-base text-black dark:text-white">{q.answer}</p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default FAQ;
