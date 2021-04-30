const questions = [
  {
    questionId: '1',
    content:
      "Một vật chuyển động thẳng đều với vận tốc v. Chọn trục toạ độ ox có phương trùng với phương chuyển động, chiều dương là chiều chuyển động, gốc toạ độ O cách  vị  trí vật xuất phát một  khoảng $OA={x}_{0}$ . Phương trình chuyển động của vật là:",
    setOfAnswer: [
      {
        id: "1A",
        content: "$x=x_{0}+v_{0} t-\\frac{1}{2} a t^{2}$",
        isCorrect: false,
      },
      {
        id: "1B",
        content: "$x=x_{0}+{vt}$",
        isCorrect: false,
      },
      {
        id: "1C",
        content: "$x=v_{0} t+\\frac{1}{2} a t^{2}$",
        isCorrect: true,
      },
      {
        id: "1D",
        content: "$x=x_{0}+v_{0} t+\\frac{1}{2} a t^{2}$",
        isCorrect: false,
      },
    ],
    level: "1",
    topic: "1011",
  },
  {
    questionId: '2',
    content:
      "Trong các  phát  biểu  dưới  đây, phát  biểu  nào  đúng ? Chuyển động cơ là: ",
    setOfAnswer: [
      {
        id: "2A",
        content: "sự thay đổi hướng của vật này so với vật khác theo thời gian.",
        isCorrect: false,
      },
      {
        id: "2B",
        content: "sự thay đổi chiều của vật này so với vật khác theo thời gian.",
        isCorrect: false,
      },
      {
        id: "2C",
        content: "sự thay đổi vị trí của vật này so với vật khác theo thời gian.",
        isCorrect: true,
      },
      {
        id: "2D",
        content: "sự thay đổi phương của vật này so với vật khác theo thời gian .",
        isCorrect: false,
      },
    ],
    level: "1",
    topic: "1011",
  },
  {
    questionId: '3',
    content:
      "Hãy chọn câu đúng.",
    setOfAnswer: [
      {
        id: "3A",
        content: "Hệ quy chiếu bao gồm vật làm mốc, hệ toạ độ, mốc thời gian.",
        isCorrect: false,
      },
      {
        id: "3B",
        content: "Hệ quy chiếu bao gồm hệ toạ độ, mốc thời gian và đồng hồ.",
        isCorrect: false,
      },
      {
        id: "3C",
        content: "Hệ quy chiếu bao gồm vật làm mốc, mốc thời gian và đồng hồ.",
        isCorrect: false,
      },
      {
        id: "3D",
        content: "Hệ quy chiếu bao gồm vật làm mốc, hệ toạ độ, mốc thời gian và đồng hồ.",
        isCorrect: true,
      },
    ],
    level: "1",
    topic: "1011",
  },
  {
    questionId: '4',
    content:
      "Chọn đáp án sai.",
    setOfAnswer: [
      {
        id: "4A",
        content: "Trong chuyển động thẳng đều tốc độ trung bình trên mọi quãng đường là như nhau.",
        isCorrect: false,
      },
      {
        id: "4B",
        content: "Quãng đường đi được của chuyển động thẳng đều được tính bằng công thức: s = v.t",
        isCorrect: false,
      },
      {
        id: "4C",
        content: "Trong chuyển động thẳng đều vận tốc được xác định bằng công thức: $v=v_{0}+a t$",
        isCorrect: true,
      },
      {
        id: "4D",
        content: "Phương trình chuyển động của chuyển động thẳng đều là: $\\mathrm{x}=\\mathrm{x}_{0}+\\mathrm{vt}$",
        isCorrect: false,
      },
    ],
    level: "1",
    topic: "1011",
  },
  {
    questionId: '5',
    content:
      "Gia tốc của chuyển động thẳng nhanh dần đều:",
    setOfAnswer: [
      {
        id: "5A",
        content: "Có phương, chiều và độ lớn không đổi.",
        isCorrect: true,
      },
      {
        id: "5B",
        content: "Tăng đều theo thời gian",
        isCorrect: false,
      },
      {
        id: "5C",
        content: "Bao giờ cũng lớn hơn gia tốc của chuyển động chậm dần đều.",
        isCorrect: false,
      },
      {
        id: "5D",
        content: "Chỉ có độ lớn không đổi.",
        isCorrect: false,
      },
    ],
    level: "1",
    topic: "1011",
  },
  {
    questionId: '6',
    content:
      "Trong các câu dưới đây câu nào sai? Trong chuyển động thẳng nhanh dần đều thì:",
    setOfAnswer: [
      {
        id: "6A",
        content: "Vectơ gia tốc ngược chiều với vectơ vận tốc",
        isCorrect: true,
      },
      {
        id: "6B",
        content: "Vận tốc tức thời tăng theo hàm số bậc nhất của thời gian",
        isCorrect: false,
      },
      {
        id: "6C",
        content: "Gia tốc là đại lượng không đổi",
        isCorrect: false,
      },
      {
        id: "6D",
        content: "Quãng đường đi được tăng theo hàm số bậc hai của thời gian.",
        isCorrect: false,
      },
    ],
    level: "1",
    topic: "1011",
  },
  {
    questionId: '6',
    content:
      "Trong các câu dưới đây câu nào sai? Trong chuyển động thẳng nhanh dần đều thì:",
    setOfAnswer: [
      {
        id: "6A",
        content: "Vectơ gia tốc ngược chiều với vectơ vận tốc",
        isCorrect: true,
      },
      {
        id: "6B",
        content: "Vận tốc tức thời tăng theo hàm số bậc nhất của thời gian",
        isCorrect: false,
      },
      {
        id: "6C",
        content: "Gia tốc là đại lượng không đổi",
        isCorrect: false,
      },
      {
        id: "6D",
        content: "Quãng đường đi được tăng theo hàm số bậc hai của thời gian.",
        isCorrect: false,
      },
    ],
    level: "1",
    topic: "1011",
  },
  {
    questionId: '7',
    content:
      "Trong các câu dưới đây câu nào sai? Trong chuyển động thẳng nhanh dần đều thì:",
    setOfAnswer: [
      {
        id: "7A",
        content: "Vectơ gia tốc ngược chiều với vectơ vận tốc",
        isCorrect: true,
      },
      {
        id: "7B",
        content: "Vận tốc tức thời tăng theo hàm số bậc nhất của thời gian",
        isCorrect: false,
      },
      {
        id: "7C",
        content: "Gia tốc là đại lượng không đổi",
        isCorrect: false,
      },
      {
        id: "7D",
        content: "Quãng đường đi được tăng theo hàm số bậc hai của thời gian.",
        isCorrect: false,
      },
    ],
    level: "1",
    topic: "1011",
  },
  {
    questionId: '8',
    content:
      "Trong các câu dưới đây câu nào sai? Trong chuyển động thẳng nhanh dần đều thì:",
    setOfAnswer: [
      {
        id: "8A",
        content: "Vectơ gia tốc ngược chiều với vectơ vận tốc",
        isCorrect: true,
      },
      {
        id: "8B",
        content: "Vận tốc tức thời tăng theo hàm số bậc nhất của thời gian",
        isCorrect: false,
      },
      {
        id: "8C",
        content: "Gia tốc là đại lượng không đổi",
        isCorrect: false,
      },
      {
        id: "8D",
        content: "Quãng đường đi được tăng theo hàm số bậc hai của thời gian.",
        isCorrect: false,
      },
    ],
    level: "1",
    topic: "1011",
  },
  {
    questionId: '9',
    content:
      "Trong các câu dưới đây câu nào sai? Trong chuyển động thẳng nhanh dần đều thì:",
    setOfAnswer: [
      {
        id: "9A",
        content: "Vectơ gia tốc ngược chiều với vectơ vận tốc",
        isCorrect: true,
      },
      {
        id: "9B",
        content: "Vận tốc tức thời tăng theo hàm số bậc nhất của thời gian",
        isCorrect: false,
      },
      {
        id: "9C",
        content: "Gia tốc là đại lượng không đổi",
        isCorrect: false,
      },
      {
        id: "9D",
        content: "Quãng đường đi được tăng theo hàm số bậc hai của thời gian.",
        isCorrect: false,
      },
    ],
    level: "2",
    topic: "1011",
  },
  {
    questionId: '10',
    content:
      "Trong các câu dưới đây câu nào sai? Trong chuyển động thẳng nhanh dần đều thì:",
    setOfAnswer: [
      {
        id: "10A",
        content: "Vectơ gia tốc ngược chiều với vectơ vận tốc",
        isCorrect: true,
      },
      {
        id: "10B",
        content: "Vận tốc tức thời tăng theo hàm số bậc nhất của thời gian",
        isCorrect: false,
      },
      {
        id: "10C",
        content: "Gia tốc là đại lượng không đổi",
        isCorrect: false,
      },
      {
        id: "10D",
        content: "Quãng đường đi được tăng theo hàm số bậc hai của thời gian.",
        isCorrect: false,
      },
    ],
    level: "2",
    topic: "1011",
  },
  {
    questionId: '11',
    content:
      "Trong các câu dưới đây câu nào sai? Trong chuyển động thẳng nhanh dần đều thì:",
    setOfAnswer: [
      {
        id: "11A",
        content: "Vectơ gia tốc ngược chiều với vectơ vận tốc",
        isCorrect: true,
      },
      {
        id: "11B",
        content: "Vận tốc tức thời tăng theo hàm số bậc nhất của thời gian",
        isCorrect: false,
      },
      {
        id: "11C",
        content: "Gia tốc là đại lượng không đổi",
        isCorrect: false,
      },
      {
        id: "11D",
        content: "Quãng đường đi được tăng theo hàm số bậc hai của thời gian.",
        isCorrect: false,
      },
    ],
    level: "2",
    topic: "1011",
  },
];

export default questions;
