
import TEST_IMG from "../../src/assets/images/test.png";

export default function Test() {
    return (
        <div className="flex flex-row h-full w-full">
            <img
                src={TEST_IMG}
                className="w-1/2 h-full object-cover object-center z-20 transition"
            />
            <img
                src={TEST_IMG}
                className="w-1/2 h-full object-cover object-center z-20 transition"
            />
        </div>
    );
}