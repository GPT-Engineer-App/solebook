import React, { useState } from "react";
import { Container, VStack, Text, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, Select, Input, HStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2023-10-01", amount: 200, type: "Income", brand: "Nike" },
    { id: 2, date: "2023-10-02", amount: 150, type: "Expense", brand: "Adidas" },
  ]);

  const [newTransaction, setNewTransaction] = useState({ date: "", amount: "", type: "", brand: "" });
  const [editTransactionId, setEditTransactionId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = () => {
    if (editTransactionId) {
      setTransactions(transactions.map((t) => (t.id === editTransactionId ? { ...newTransaction, id: editTransactionId } : t)));
      setEditTransactionId(null);
    } else {
      setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
    }
    setNewTransaction({ date: "", amount: "", type: "", brand: "" });
  };

  const handleEditTransaction = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setNewTransaction(transaction);
    setEditTransactionId(id);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Sneaker Accounting App</Text>
        <HStack spacing={4} width="100%">
          <Input placeholder="Date" name="date" value={newTransaction.date} onChange={handleInputChange} />
          <Input placeholder="Amount" name="amount" value={newTransaction.amount} onChange={handleInputChange} />
          <Select placeholder="Type" name="type" value={newTransaction.type} onChange={handleInputChange}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </Select>
          <Select placeholder="Brand" name="brand" value={newTransaction.brand} onChange={handleInputChange}>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
          </Select>
          <Button onClick={handleAddTransaction}>{editTransactionId ? "Update" : "Add"}</Button>
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Brand</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.date}</Td>
                <Td>{transaction.amount}</Td>
                <Td>{transaction.type}</Td>
                <Td>{transaction.brand}</Td>
                <Td>
                  <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEditTransaction(transaction.id)} />
                  <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDeleteTransaction(transaction.id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;